use rocket::serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Tests {
    pub user_nickname: String,
    pub wpm: i16
}