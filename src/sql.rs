use rusqlite::{Connection, Result};

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