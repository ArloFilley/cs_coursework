pub mod sql;

// relevant macros and imports for rocket.rs
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

#[get("/")]
fn test() -> String {
    sql::create_database()
        .expect("couldn't create database");

    sql::create_user("arlo", "passwod123")
        .expect("couldn't create user");
    
    sql::create_user("arlo","password123")
        .expect("couldn't create user");
    String::from("Hello World!")
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

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct User<'r> {
    username: &'r str,
    password: &'r str
}

#[post("/create_user", data = "<user>")]
fn create_user(
    user: Json<User<'_>>
) {
    sql::create_user(
        user.username, 
        user.password
    ).expect("Error: Couldn't create new user");
}

#[get("/login/<username>/<password>")]
fn login(username: &str, password: &str) -> String {
    let user_id = sql::find_user(username, password).expect("error finding user_id");
    user_id.to_string()
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/test", routes![test]) // testing only, should return "Hello world"
    .mount("/api", routes![post_test, create_user, login])
    .mount("/typing", FileServer::from(relative!("website"))) // hosts the fileserver
}