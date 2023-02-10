use rocket::serde::{
    Deserialize, 
    json::Json
};

use crate::typing::sql::{
    get_user_tests,
    find_user,
    create_user,

    Test,
};

/// Struct representing the user
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User<'r> {
    username: &'r str,
    password: &'r str
}

/// Route takes data about the user as a struct
/// and then creates the user in the database
/// Acessible from http://url/api/create_user
#[post("/create_user", data = "<user>")]
pub fn sign_up(user: Json<User<'_>>) {
    create_user(
        user.username, 
        &sha256::digest(user.password),
    ).expect("Error: Couldn't create new user");
}

/// Gets the users tests from the database and returns it as a
/// json array.
/// Accessible from http://url/api/get_user_tests
#[get("/get_tests/<user_id>")]
pub fn get_tests(user_id: u32) -> Json<Vec<Test>> {
    let tests: Vec<Test> = get_user_tests(user_id).expect("error finding user_id");
    Json(tests)
}

/// takes the users login information and returns the users user id
/// which can be used to identify their tests etc.
/// Accessible from http://url/api/login
#[get("/login/<username>/<password>")]
pub fn login(username: &str, password: &str) -> String {
    let user_id = find_user(username, &sha256::digest(password)).expect("error finding user_id");
    user_id.to_string()
}

