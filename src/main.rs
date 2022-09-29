#[macro_use] extern crate rocket;
use rocket::{Rocket, Build};

#[get("/")]
fn index() -> String {
    format!("Hello world")
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
    .mount("/", routes![index])
}