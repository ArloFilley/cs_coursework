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
};

mod typing;
mod servers;

use crate::typing::sql::*;
use crate::typing::user::{
    get_tests,
    login,
    sign_up
};
use crate::typing::test::{
    create_test,
    new_test
};
use crate::typing::leaderboard::leaderboard;
use crate::servers::server::{
    server,
    server_info
};

// Imports for sql, see sql.rs for more information

/// Test api route that returns hello world.
/// Acessible from http://url/test
#[get("/")]
fn test() -> String {
    String::from("Hello World!")
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
        create_database, sign_up,
        create_test, login, get_tests, 
        leaderboard, new_test,
    ])

    .mount("/api", routes![
        server, server_info
    ])
    // hosts the fileserver
    .mount("/typing", FileServer::from(relative!("websites/Typing")))
    .mount("/servers", FileServer::from(relative!("websites/Servers")))
}