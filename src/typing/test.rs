use crate::typing::sql::Database;
use rocket::{
    serde::{ Deserialize, json::Json },
    State
};
use rand::{
    Rng, 
    rngs::ThreadRng
};
use std::{
    fs, 
    vec,
};

/// the datascructure that the webserver will recieve
/// when a post is made to the http://url/api/post_test route
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct PostTest<'r> {
    pub test_type: &'r str,
    pub test_length: u32,
    pub test_time: u32,
    pub test_seed: i64,
    pub quote_id: i32,
    pub wpm: u8,
    pub accuracy: u8,
    pub user_id: u32,
    pub secret: &'r str
}

/// Api Route that accepts test data and posts it to the database
/// Acessible from http://url/api/post_test
#[post("/post_test", data = "<test>")]
pub async fn create_test(test: Json<PostTest<'_>>, database: &State<Database>) {
    let user_id = test.user_id;
    match database.create_test(test).await {
        Err(why) => { println!("A database error occured creating a test, {why}"); }
        Ok(()) => { println!("Successfully created test for {user_id}"); }
    }
}

/// Returns an array of words as Json
/// Accessible from http://url/api/get_test
#[get("/new_test")]
pub fn new_test() -> Json<Vec<String>> {
    let mut word_vec: Vec<&str> = vec![]; 
    let words: String = fs::read_to_string("wordlist.txt").unwrap();
    for word in words.split('\n') {
        word_vec.push(word);
    }

    let mut return_list: Vec<String> = vec![];

    let mut rng: ThreadRng = rand::thread_rng();
    for _ in 0..100 {
        let word = rng.gen_range(0..999);
        return_list.push(word_vec[word].to_string())
    }

    Json(return_list.clone())
}