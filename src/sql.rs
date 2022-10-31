use rusqlite::{Connection, Result};
use crate::tests::Tests;

fn get_connection() -> Result<rusqlite::Connection, rusqlite::Error> {
    let connection = Connection::open("database/database.sqlite")?;
    Ok(connection)
}

pub fn create_database() -> Result<()> {
    let connection = get_connection()?;
    
    connection.execute(
        "CREATE TABLE IF NOT EXISTS tests (
            test_id INTEGER PRIMARY KEY,
            user_nickname TEXT NOT NULL,
            test_type TEXT NOT NULL,
            test_length INTEGER,
            test_time INTEGER,
            test_seed INTEGER,
            quote_id INTEGER,
            wpm INTEGER,
            accuracy INTEGER,
            user_id INTEGER
        )",
        (), // empty parameters list
    )?;

    Ok(())
}

pub fn post_test(user_nickname: &str,test_type: &str, test_length: u64, test_time: u32, test_seed: i64, quote_id: i32, wpm: u8, accuracy: u8, user_id: u32) 
-> Result<()> {
    let connection = get_connection()?;

    connection.execute(
        "INSERT INTO tests (
        user_nickname,
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
        (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?8]9)
        ", (user_nickname, test_type, test_length, test_time, test_seed, quote_id,
            wpm, accuracy,user_id))?;

    Ok(())
}

pub fn delete_data() -> Result<()> {
    get_connection()?.prepare(
         "DELETE 
         FROM tests",
     )?
     .execute([])?;
     Ok(())
}

pub fn get_tests() -> Result<Vec<Tests>, rusqlite::Error> {
    let connection = get_connection()?;
    let mut stmt = connection.prepare(
        "SELECT user_nickname, wpm
        FROM tests
        ORDER BY wpm DESC",
    )?;
    let person_iter = stmt
        .query_map([], |row| {
            Ok(Tests { 
            user_nickname: row.get(0)?, 
                wpm: row.get(1)? 
            })
        })?;

    let mut tests: Vec<Tests> = vec![];
    for test in person_iter {
        tests.push(test?);
    }

    Ok(tests)
}

pub fn delete_cheater_data() -> Result<(), rusqlite::Error>{
    get_connection()?.prepare(
    "DELETE
        FROM tests
        WHERE wpm > 200",
    )?
    .execute([])?;
    Ok(())
}

