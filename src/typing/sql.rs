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
use rusqlite::{Connection, Result};
use rocket::serde::Serialize;

/// gets a connection to the database and returns it as
/// a rusqlite::connection
fn get_connection() -> rusqlite::Connection {
    Connection::open("database/database.sqlite")
        .expect("Error creating database connection")
}

/// Creates the necessary tables inside the database with
/// correct normalised links between data for later
/// querying
fn new_database() -> Result<()> {
    let connection = get_connection();

    connection.execute(
        "CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )", 
        ()
    )?;
    
    connection.execute(
        "CREATE TABLE IF NOT EXISTS tests (
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
        )",
        ()
    )?;

    Ok(())
}

/// Api route that creates a database if one
/// does not already exist.
/// Acessible from http://url/api/create_database
#[get("/create_database")]
pub fn create_database() -> String {
    let database = new_database();
    match database {
        Err(why) => format!("Error: {why}"),
        Ok(_) => format!("Sucessfully created the database")
    }
}

/// takes necessary data about a test and creates
/// a database record with the data
pub fn post_test(
    test_type: &str, 
    test_length: u32, 
    test_time: u32, 
    test_seed: i64, 
    quote_id: i32, 
    wpm: u8, 
    accuracy: u8, 
    user_id: u32
) -> Result<()> {
    let connection = get_connection();

    connection.execute(
        "INSERT INTO tests (
            test_type,
            test_length,
            test_time,
            test_seed,
            quote_id,
            wpm,
            accuracy,
            user_id
        )
        VALUES(
            ?1, 
            ?2, 
            ?3, 
            ?4, 
            ?5, 
            ?6, 
            ?7, 
            ?8
        )
        ", 
        (
            test_type, 
            test_length, 
            test_time, 
            test_seed, 
            quote_id,
            wpm, 
            accuracy,
            user_id
        )
    )?;

    Ok(())
}

/// takes a username and password and creates a database
/// entry for a new user
pub fn create_user(
    username: &str,
    password: &str 
) -> Result<()> {
    let connection = get_connection();

    connection.execute(
        "
        INSERT INTO users (
            username,
            password
        )
        VALUES (
            ?1, 
            ?2
        )
        ",
 (
            username, 
            password
        )
    )?;

    Ok(())
}

/// struct which can be deserialised
/// from json to get the user_id
#[derive(Debug)]
pub struct User {
    user_id: u32,
}

/// takes a username and password as inputs and returns the
/// user_id of the user if one exists
pub fn find_user(
    username: &str,
    password: &str
) -> Result<u32> {
    let mut user_id: u32 = 0;
    let connection = get_connection();
    let mut statement = connection.prepare(
        "SELECT user_id
        FROM users
        WHERE username=:username AND password=:password",
    )?;

    let iter = statement
    .query_map(
        &[(":username", username), (":password", password)], |row| {
            Ok( User {
                user_id: row.get(0)?
            })
        }
    )?;

    for i in iter {
        user_id = i.unwrap().user_id;
    }

    Ok(user_id)
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

/// returns all the tests that a given user_id has
/// completed from the database
pub fn get_user_tests(
    user_id: u32
) -> Result<Vec<Test>> {
    let connection = get_connection();
    let mut statement = connection.prepare(
        "SELECT test_type, test_length, test_time, test_seed, quote_id, wpm, accuracy
        FROM tests
        WHERE user_id=:user_id",
    )?;

    let test_iter = statement
        .query_map(&[(":user_id", &user_id.to_string())], |row| {
            Ok( Test {
                test_type: row.get(0)?,
                test_length: row.get(1)?,
                test_time: row.get(2)?,
                test_seed: row.get(3)?,
                quote_id: row.get(4)?,
                wpm: row.get(5)?,
                accuracy: row.get(6)?
            })
        })?;

    let mut tests: Vec<Test> = vec![];
    for test in test_iter {
        tests.push(test.unwrap());
    }

    Ok(tests)
}

/// struct that represents all the data that gets sent to the user
/// when they make a leaderboard request
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LeaderBoardTest {
    username: String,
    wpm: u8,
}

/// returns a vector of leaderboard tests, where each one is the fastest words
/// per minute that a given user has achieved
pub fn get_leaderboard(
    _user_id: u32
) -> Result<Vec<LeaderBoardTest>>{
    let connection = get_connection();
    let mut statement = connection.prepare(
        "SELECT users.username, MAX(tests.wpm)
        FROM tests
        INNER JOIN users ON users.user_id = tests.user_id
        GROUP BY users.username
        ORDER BY tests.wpm DESC",
    )?;

    let test_iter = statement
        .query_map((), |row| {
            Ok( LeaderBoardTest {
                username: row.get(0)?,
                wpm: row.get(1)?
            })
        })?;

    let mut tests: Vec<LeaderBoardTest> = vec![];
    for test in test_iter {
        tests.push(test.unwrap());
    }

    Ok(tests)
}