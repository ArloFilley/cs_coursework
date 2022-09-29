#[macro_use] extern crate rocket;
use rocket::{Rocket, Build, fs::FileServer};

#[get("/")]
fn index() -> String {
    format!("Hello world")
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/", routes![index])
    .mount("/", FileServer::from("/Users/arlo/Desktop/p5stuff/cs_coursework/website"))
}