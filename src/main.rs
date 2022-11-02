// relevant macros and imports for rocket.rs
#[macro_use] extern crate rocket;
use rocket::{Rocket, Build, fs::{FileServer, relative}, serde::{Deserialize, json::Json}};
pub mod sql;
use crate::sql::Test;

#[get("/")]
fn test() -> String {
    sql::create_database()
        .expect("couldn't create database");
    String::from("Successfully created database")
}

#[get("/login/<username>/<password>")]
fn login(username: &str, password: &str) -> String {
    let user_id = sql::get_user_id(username, password).expect("error finding user_id");
    user_id.to_string()
}

#[get("/get_user_tests/<user_id>")]
fn get_user_tests(user_id: u32) -> Json<Vec<Test>> {
    let tests = sql::get_user_tests(user_id).expect("error finding user_id");
    Json(tests)
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct PostTest<'r> {
    test_type: &'r str,
    test_length: i64,
    test_time: i32,
    test_seed: i64,
    quote_id: i32,
    wpm: i16,
    accuracy: i8,
    user_id: i32
}

#[post("/post_test", data = "<test>")]
fn post_test(test: Json<PostTest<'_>>) {
    sql::post_test(test.test_type, test.test_length, test.test_time, test.test_seed, test.quote_id, test.wpm, test.accuracy, test.user_id)
        .expect("error in posting test to tests table");
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct User<'r> {
    user_name: &'r str,
    password: &'r str
}

#[post("/user_signup", data = "<user>")]
fn user_signup(user: Json<User<'_>>) {
    sql::create_user(user.user_name, user.password)
        .expect("error in posting test to tests table");
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/test", routes![test]) // testing only, should return "Hello world"
    .mount("/api", routes![post_test, user_signup, login, get_user_tests])
    .mount("/", FileServer::from(relative!("website"))) // hosts the fileserver
}