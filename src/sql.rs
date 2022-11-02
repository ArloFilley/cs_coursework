use rocket::serde::Serialize;
use rusqlite::{Connection, Result};

#[derive(Debug)]
pub struct User {
    user_id: u32,
}

#[derive(Debug)]
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Test {
    wpm: u8,
}

fn get_connection() -> Result<rusqlite::Connection, rusqlite::Connection> {
    let conn = Connection::open("database/database.sqlite")
        .expect("error getting database connection");
    Ok(conn)
}

pub fn create_database() -> Result<(), rusqlite::Error> {
    let connection = get_connection().expect("error getting database connection");

    connection.execute("CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        user_name TEXT UNIQUE,
        user_password TEXT NOT NULL)"
    , ()).expect("error");
    
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
        (),
    ).expect("error creating tables");

    Ok(())
}

pub fn post_test(test_type: &str, test_length: i64, test_time: i32, test_seed: i64, quote_id: i32, wpm: i16, accuracy: i8, user_id: i32) 
-> Result<(), rusqlite::Error> {
    let connection = get_connection().expect("error");

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
        VALUES
        (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
        ", (test_type, test_length, test_time, test_seed, quote_id,
            wpm, accuracy,user_id))?;

    Ok(())
}

pub fn create_user(user_name: &str, password: &str) -> Result<(), rusqlite::Error> {
    let connection = get_connection().expect("error");

    connection.execute(
        "INSERT INTO users (
        user_name,
        user_password
        )
        VALUES
        (?1, ?2)
        ", (user_name, password))?;

    Ok(())
}

pub fn get_user_id(user_name: &str, user_password: &str) -> Result<u32, rusqlite::Error> {
    let connection = get_connection().expect("error getting connection");
    let mut stmt = connection.prepare(
        "SELECT user_id
        FROM users
        WHERE user_name=:user_name AND user_password=:user_password",
    )?;

    let mut user_id: u32 = 0;

    let person_iter = stmt
        .query_map(&[(":user_name", user_name), (":user_password", user_password)], |row| {
            Ok( User {
                user_id: row.get(0)?,
            })
        })?;

    for user in person_iter {
        user_id = user.unwrap().user_id;
    }

    Ok(user_id)
}

pub fn get_user_tests(_user_id: u32) -> Result<Vec<Test>, rusqlite::Error> {
    let connection = get_connection().expect("error getting connection");
    let mut stmt = connection.prepare(
        "SELECT wpm
        FROM tests
        WHERE user_id=:user_id",
    )?;

    let mut user_id: u32 = 0;

    let test_iter = stmt
        .query_map(&[(":user_id", &_user_id.to_string())], |row| {
            Ok( Test {
                wpm: row.get(0)?,
            })
        })?;

    let mut tests: Vec<Test> = vec![];
    for test in test_iter {
        tests.push(test.unwrap());
    }

    Ok(tests)
}