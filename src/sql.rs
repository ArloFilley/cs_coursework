use rusqlite::{Connection, Result};

fn get_connection() -> rusqlite::Connection {
    Connection::open("database/database.sqlite")
        .expect("Error creating database connection")
}

pub fn create_database() -> Result<()> {
    let connection = get_connection();
    
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
            user_id INTEGER
        )",
        (), // empty parameters list
    )?;

    Ok(())
}

pub fn post_test(test_type: &str, test_length: i64, test_time: i32, test_seed: i64, quote_id: i32, wpm: i16, accuracy: i8, user_id: i32) 
-> Result<()> {
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
        VALUES
        (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
        ", (test_type, test_length, test_time, test_seed, quote_id,
            wpm, accuracy,user_id))?;

    Ok(())
}