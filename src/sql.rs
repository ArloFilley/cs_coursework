use rusqlite::{Connection, Result};
use rocket::serde::Serialize;

fn get_connection() -> rusqlite::Connection {
    Connection::open("database/database.sqlite")
        .expect("Error creating database connection")
}

pub fn create_database() -> Result<()> {
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

pub fn create_user(
    username: &str,
    password: &str 
) -> Result<()> {
    println!("{} {}",username, password);
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

#[derive(Debug)]
pub struct User {
    user_id: u32,
}

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

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LeaderBoardTest {
    username: String,
    wpm: u8,
}

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