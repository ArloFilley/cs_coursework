use rocket::{
    serde::{Deserialize, json::Json, Serialize},
    State
};

use rand::{ distributions::Alphanumeric, Rng };

use crate::typing::sql::{ Database, Test };

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
pub async fn sign_up(user: Json<User<'_>>, database: &State<Database>) {
    let secret: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(50)
        .map(char::from)
        .collect();

    match database.create_user( user.username, &sha256::digest(user.password), &secret ).await {
        Err(why) => { println!("A database error occured during signup, {why}"); }
        Ok(()) => { println!("Succesfully Signed up User: {}", user.username); }
    }
}

/// Gets the users tests from the database and returns it as a
/// json array.
/// Accessible from http://url/api/get_user_tests
#[get("/get_tests/<user_id>/<secret>")]
pub async fn get_tests(user_id: u32, secret: String, database: &State<Database>) -> Option<Json<Vec<Test>>> {
    match database.get_user_tests(user_id, &secret).await {
        Err(why) => { 
            println!("A database error occured during getting_tests, {why}"); 
            None
        }
        Ok(tests) => {
            println!("Succesfully Found Tests for User {user_id}"); 
            Some(Json(tests))
        }
    }
}

/// takes the users login information and returns the users user id
/// which can be used to identify their tests etc.
/// Accessible from http://url/api/login
#[get("/login/<username>/<password>")]
pub async fn login(username: &str, password: &str, database: &State<Database>) -> Json<Option<LoginResponse>> {
    match database.find_user(username, &sha256::digest(password)).await {
        Err(why) => {
            println!("A database error occured during login for {username}, {why}");
            Json(None)
        }
        Ok(user) => {
            match user {
                None => Json(None),
                Some(user) => { Json(Some(LoginResponse { user_id: user.0, secret: user.1 })) }
            }
        }
    }
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginResponse {
    user_id: u32,
    secret: String,
}
