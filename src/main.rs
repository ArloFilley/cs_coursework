// relevant macros and imports for rocket.rs
#[macro_use] extern crate rocket;
use rocket::{Rocket, Build, fs::{FileServer, relative}, serde::{Deserialize, json::Json}, Error, Response};
pub mod sql;

#[get("/")]
fn test() -> String {
    sql::create_database()
        .expect(&format!("couldn't create database"));
    format!("Hello world")
}

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

#[post("/post_test", data = "<test>")]
fn post_test(test: Json<PostTest<'_>>) {
    sql::post_test(test.test_type, test.test_length, test.test_time, test.test_seed, test.quote_id, test.wpm, test.accuracy, test.user_id)
        .expect("error in posting test to tests table");
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/test", routes![test]) // testing only, should return "Hello world"
    .mount("/api", routes![post_test])
    .mount("/", FileServer::from(relative!("website"))) // hosts the fileserver
}