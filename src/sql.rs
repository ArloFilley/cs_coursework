use rusqlite::{Connection, Result};

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

pub fn create_user() -> Result<(), rusqlite::Error> {
    let connection = get_connection().expect("error");

    connection.execute(
        "INSERT INTO users (
        user_name,
        user_password
        )
        VALUES
        (?1, ?2)
        ", (&"arlo", &"filley"))?;

    Ok(())
}

pub fn get_user_id() -> Result<u32, rusqlite::Error> {
    
}