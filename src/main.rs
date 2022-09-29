#[macro_use] extern crate rocket;
use rocket::{Rocket, Build};

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
}