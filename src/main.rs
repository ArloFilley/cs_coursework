//! src/main.rs
//! This file launches the web server which hosts the fileserver and the api
//! Author: Arlo Filley
//! 
//! TODO:
//!     - move structures into a different file
//!     - find a way to make logging in more secure (password hashes?)

// Imports for rocket
#[macro_use] extern crate rocket;
use rocket::{
    Rocket, 
    Build, 
    fs::{
        FileServer, 
        relative
    }, 
    serde::{
        Deserialize, 
        json::Json
    }
};

// Imports for sql, see sql.rs for more information
pub mod sql;
use crate::sql::*;

/// Test api route that returns hello world.
/// Acessible from http://url/test
#[get("/")]
fn test() -> String {
    String::from("Hello World!")
}

/// Api route that creates a database if one
/// does not already exist.
/// Acessible from http://url/api/create_database
#[get("/create_database")]
fn create_database() -> String {
    sql::create_database()
        .expect("couldn't create database");
    String::from("Successfully created a database")
}


/// the datascructure that the webserver will recieve
/// when a post is made to the http://url/api/post_test route
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct PostTest<'r> {
    test_type: &'r str,
    test_length: u32,
    test_time: u32,
    test_seed: i64,
    quote_id: i32,
    wpm: u8,
    accuracy: u8,
    user_id: u32
}

/// Api Route that accepts test data and posts it to the database
/// Acessible from http://url/api/post_test
#[post("/post_test", data = "<test>")]
fn post_test(
    test: Json<PostTest<'_>>
) {
    sql::post_test(
        test.test_type, 
        test.test_length, 
        test.test_time, 
        test.test_seed, 
        test.quote_id, 
        test.wpm, 
        test.accuracy, 
        test.user_id
    ).expect("error in posting test to tests table");
}

/// Struct representing the user
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct User<'r> {
    username: &'r str,
    password: &'r str
}

/// Route takes data about the user as a struct
/// and then creates the user in the database
/// Acessible from http://url/api/create_user
#[post("/create_user", data = "<user>")]
fn create_user(
    user: Json<User<'_>>
) {
    sql::create_user(
        user.username, 
        user.password
    ).expect("Error: Couldn't create new user");
}

/// takes the users login information and returns the users user id
/// which can be used to identify their tests etc.
/// Accessible from http://url/api/login
#[get("/login/<username>/<password>")]
fn login(username: &str, password: &str) -> String {
    let user_id = sql::find_user(username, password).expect("error finding user_id");
    user_id.to_string()
}

/// Gets the users tests from the database and returns it as a
/// json array.
/// Accessible from http://url/api/get_user_tests
#[get("/get_user_tests/<user_id>")]
fn get_user_tests(user_id: u32) -> Json<Vec<Test>> {
    let tests = sql::get_user_tests(user_id).expect("error finding user_id");
    Json(tests)
}

/// Returns the highest test data from each user as
/// a json array
/// Acessible from http://url/api/leaderboard
#[get("/leaderboard")]
fn leaderboard() -> Json<Vec<LeaderBoardTest>> {
    let leaderboard = sql::get_leaderboard(0).expect("error finding user_id");
    Json(leaderboard)
}

/// The main function which builds and launches the
/// webserver with all appropriate routes and fileservers
#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    // testing only, should return "Hello world"
    .mount("/test", routes![test]) 
    // hosts the api routes necessary for the website
    // to interact with the database
    .mount("/api", routes![
        create_database, create_user,
        post_test, login, get_user_tests, 
        leaderboard
        ])
    // hosts the fileserver
    .mount("/typing", FileServer::from(relative!("website")))
}