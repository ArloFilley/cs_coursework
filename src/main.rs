// relevant macros and imports for rocket.rs
#[macro_use] extern crate rocket;
use rocket::{
    Rocket, Build, 
    fs::{FileServer, relative}, 
    serde::{Deserialize, json::Json}
};
use tests::Tests;
pub mod sql;
pub mod tests;

#[get("/")]
fn test() -> String {
    sql::create_database().expect("error creating database");
    String::from("created database sucessfully")
}

#[get("/")]
fn delete() -> String {
    sql::delete_data().expect("couldn't delete database");
    format!("removed data sucessfully")
}

#[get("/")]
fn leaderboard() -> Json<Vec<Tests>> {
    let response = sql::get_tests().expect("error getting tests");
    Json(response)
}


#[get("/")]
fn delete_cheater() -> String {
    sql::delete_cheater_data().expect("error getting tests");
    String::from("deleted cheaters")
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct PostTest<'r> {
    user_nickname: &'r str,
    test_type: &'r str,
    test_length: u64,
    test_time: u32,
    test_seed: i64,
    quote_id: i32,
    wpm: u8,
    accuracy: u8,
    user_id: u32
}

#[post("/post_test", data = "<test>")]
fn post_test(test: Json<PostTest<'_>>) {
    println!(
        "{}\n{}\n{}\n{}\n{}\n{}\n{}\n{}\n{}", 
        test.user_nickname,
        test.test_type, 
        test.test_length, 
        test.test_time, 
        test.test_seed, 
        test.quote_id, 
        test.wpm, 
        test.accuracy, 
        test.user_id
    );
    sql::post_test(test.user_nickname, test.test_type, test.test_length, test.test_time, test.test_seed, test.quote_id, test.wpm, test.accuracy, test.user_id)
        .expect("error in posting test to tests table");
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/test", routes![test]) // testing only, should return "Hello world"
    // .mount("/delete", routes![delete])
    .mount("/delete_cheaters", routes![delete_cheater])
    .mount("/leaderboard", routes![leaderboard])
    .mount("/api", routes![post_test])
    .mount("/typing", FileServer::from(relative!("website"))) // hosts the fileserver
}