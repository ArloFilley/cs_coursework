//! src/main.rs
//! This file launches the web server which hosts the fileserver and the api
//! Author: Arlo Filley
//!
//! TODO:
//!     - move structures into a different file
//!     - find a way to make logging in more secure (password hashes?)

// use rocket::fairing::{Fairing, Info, Kind};
// use rocket::http::Header;
// use rocket::{Request, Response};

// pub struct CORS;

// #[rocket::async_trait]
// impl Fairing for CORS {
//     fn info(&self) -> Info {
//         Info {
//             name: "Add CORS headers to responses",
//             kind: Kind::Response,
//         }
//     }

//     async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
//         response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
//         response.set_header(Header::new(
//             "Access-Control-Allow-Methods",
//             "POST, GET, PATCH, OPTIONS",
//         ));
//         response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
//         response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
//     }
// }

// Imports for rocket
#[macro_use]
extern crate rocket;
use rocket::{
    fs::{relative, FileServer},
    Build, Rocket,
};

mod typing;

use crate::typing::leaderboard::leaderboard;
use crate::typing::sql::Database;
use crate::typing::test::{create_test, new_test};
use crate::typing::user::{get_tests, login, sign_up};

// Imports for sql, see sql.rs for more information

/// Test api route that returns hello world.
/// Acessible from http://url/test
#[get("/")]
fn test() -> &'static str {
    "Hello World! I'm A rocket Webserver"
}

/// The main function which builds and launches the
/// webserver with all appropriate routes and fileservers
#[launch]
async fn rocket() -> Rocket<Build> {
    rocket::build()
        // .attach(CORS)
        // testing only, should return "Hello world"
        .mount("/test", routes![test])
        // hosts the api routes necessary for the website
        // to interact with the database
        .mount(
            "/api",
            routes![
                sign_up,
                create_test,
                login,
                get_tests,
                leaderboard,
                new_test,
            ],
        )
        // hosts the fileserver
        .mount("/typing", FileServer::from(relative!("websites/Typing")))
        .manage(Database::new().await.unwrap())
}
