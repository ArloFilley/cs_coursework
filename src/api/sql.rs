//! src/sql.rs
//! This file contains all the necessary code to
//! interact with the sqlite database using functions
//! it abstracts away the rusqlite necessary to perform
//! these functions
//! Author: Arlo Filley
//!
//! TODO:
//!     - put necessary structs into a different file
//!     - create structure for the input of post test

// Imports for json handling and rusqlite
use rocket::serde::{json::Json, Serialize};
use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};

use crate::api::test::PostTest;

/// Contains the database connection pool
pub struct Database(SqlitePool);

/// gets a connection to the database and returns it as
/// a rusqlite::connection
impl Database {
    pub async fn new() -> Result<Self, sqlx::Error> {
        let pool = SqlitePoolOptions::new()
            .max_connections(2)
            .connect("sqlite:/Users/arlo/Code/Projects/cs_coursework/database/database.sqlite")
            .await?;

        Ok(Self(pool))
    }

    /// Creates the necessary tables inside the database with
    /// correct normalised links between data for later querying
    pub async fn _new_database(&self) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "
            CREATE TABLE IF NOT EXISTS Users (
                user_id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                secret TEXT NOT NULL
            )"
        )
        .execute(&self.0)
        .await?;

        sqlx::query!(
            "
            CREATE TABLE IF NOT EXISTS Tests (
                test_id INTEGER PRIMARY KEY,
                test_type TEXT NOT NULL,
                test_length INTEGER,
                test_time INTEGER,
                test_seed INTEGER,
                quote_id INTEGER,
                wpm INTEGER,
                accuracy INTEGER,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(user_id)
            )"
        )
        .execute(&self.0)
        .await?;

        Ok(())
    }

    /// takes necessary data about a test and creates
    /// a database record with the data
    pub async fn create_test(&self, test: Json<PostTest<'_>>) -> Result<(), sqlx::Error> {
        // Test to see whether the secret is correct
        let user = sqlx::query!(
            "
            Select secret
            From Users
            Where user_id=?",
            test.user_id
        )
        .fetch_one(&self.0)
        .await?;

        if user.secret != test.secret {
            return Err(sqlx::Error::RowNotFound);
        }

        sqlx::query!("
            INSERT INTO Tests (test_type, test_length, test_time, test_seed, quote_id, wpm, accuracy, user_id)
            VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
            test.test_type, test.test_length, test.test_time, test.test_seed, test.quote_id, test.wpm, test.accuracy, test.user_id
        ).execute(&self.0).await?;

        Ok(())
    }

    /// takes a username and password and creates a database
    /// entry for a new user
    pub async fn create_user(
        &self,
        username: &str,
        password: &str,
        secret: &str,
    ) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "
            INSERT INTO Users (username, password, secret)
            VALUES (?1, ?2, ?3)",
            username,
            password,
            secret
        )
        .execute(&self.0)
        .await?;

        Ok(())
    }

    /// takes a username and password as inputs and returns the
    /// user_id and secret of the user if one exists
    pub async fn find_user(
        &self,
        username: &str,
        password: &str,
    ) -> Result<Option<(u32, String)>, sqlx::Error> {
        let user = sqlx::query!(
            "
            SELECT user_id, secret
            FROM Users
            WHERE username=? AND password=?",
            username,
            password
        )
        .fetch_one(&self.0)
        .await?;

        let user_id = user.user_id.unwrap() as u32;
        let secret = user.secret.clone();

        Ok(Some((user_id, secret)))
    }

    /// returns all the tests that a given user_id has
    /// completed from the database
    pub async fn get_user_tests(
        &self,
        user_id: u32,
        secret: &str,
    ) -> Result<Vec<Test>, sqlx::Error> {
        let tests = sqlx::query!(
            "
            SELECT test_type, test_length, test_time, test_seed, quote_id, wpm, accuracy
            FROM tests
            INNER JOIN users ON users.user_id = tests.user_id
            WHERE users.user_id=? AND users.secret=?",
            user_id,
            secret
        )
        .fetch_all(&self.0)
        .await?;

        println!("{}", tests.len());

        let user_tests = tests
            .iter()
            .map(|test| Test {
                test_type: test.test_type.clone(),
                test_length: test.test_length.unwrap() as u32,
                test_time: test.test_time.unwrap() as u32,
                test_seed: test.test_seed.unwrap(),
                quote_id: test.quote_id.unwrap() as i32,
                wpm: test.wpm.unwrap() as u8,
                accuracy: test.accuracy.unwrap() as u8,
            })
            .collect();

        Ok(user_tests)
    }

    /// returns a vector of leaderboard tests, where each one is the fastest words
    /// per minute that a given user has achieved
    pub async fn get_leaderboard(
        &self,
        _user_id: u32,
    ) -> Result<Vec<LeaderBoardTest>, sqlx::Error> {
        let tests = sqlx::query!(
            "SELECT users.username, tests.wpm
            FROM tests
            INNER JOIN users ON users.user_id = tests.user_id
            GROUP BY users.username
            ORDER BY tests.wpm DESC",
        )
        .fetch_all(&self.0)
        .await?;

        let leaderboard_tests = tests
            .iter()
            .map(|test| LeaderBoardTest {
                username: test.username.clone(),
                wpm: test.wpm.unwrap() as u8,
            })
            .collect();

        Ok(leaderboard_tests)
    }

    /// Authenticates a user based on their user ID and secret.
    ///
    /// # Arguments
    ///
    /// * `user_id` - The ID of the user to authenticate.
    /// * `secret` - The secret associated with the user.
    ///
    /// # Returns
    ///
    /// Returns a `Result` indicating whether the authentication was successful or not.
    /// - `Ok(true)` if authentication is successful.
    /// - `Ok(false)` if authentication fails.
    /// - `Err` if there's an error accessing the database.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::sql::Database;
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///     let db = Database::new().await.expect("Failed to create database connection");
    ///
    ///     // Authenticate user with user ID 123 and secret "example_secret"
    ///     let authenticated = db.authenticate_user(123, "example_secret").await;
    ///     assert_eq!(authenticated, Ok(true));
    /// }
    /// ```
    pub async fn authenticate_user(&self, user_id: u32, secret: &str) -> Result<bool, sqlx::Error> {
        // Test to see whether the secret is correct
        let user = sqlx::query!(
            "
            Select secret
            From Users
            Where user_id=?",
            user_id
        )
        .fetch_one(&self.0)
        .await?;

        // Compare the fetched secret with the provided one
        Ok(user.secret == secret)
    }
}

/// struct representing data that needs to be sent
/// to the user
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Test {
    test_type: String,
    test_length: u32,
    test_time: u32,
    test_seed: i64,
    quote_id: i32,
    wpm: u8,
    accuracy: u8,
}

/// struct that represents all the data that gets sent to the user
/// when they make a leaderboard request
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LeaderBoardTest {
    username: String,
    wpm: u8,
}
