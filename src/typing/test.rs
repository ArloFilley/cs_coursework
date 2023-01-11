use crate::typing::sql::post_test;
use rocket::serde::{
    Deserialize,
    json::Json
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
    test_type: &'r str,
    test_length: u32,
    test_time: u32,
    test_seed: i64,
    quote_id: i32,
    wpm: u8,
    accuracy: u8,
    user_id: u32
}

/// Api Route that accepts test data and posts it to the database
/// Acessible from http://url/api/post_test
#[post("/post_test", data = "<test>")]
pub fn create_test(test: Json<PostTest<'_>>) {
    post_test(
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

/// Returns an array of words as Json
/// Accessible from http://url/api/get_test
#[get("/new_test")]
pub fn new_test() -> Json<Vec<String>> {
    let mut word_vec: Vec<&str> = vec![]; 
    let words: String = fs::read_to_string("wordlist.txt").unwrap();
    for word in words.split('\n') {
        word_vec.push(word.clone());
    }

    let mut return_list: Vec<String> = vec![];

    let mut rng: ThreadRng = rand::thread_rng();
    for _i in 0..100 {
        let hi: u32 = rng.gen_range(0..999);
        return_list.push(word_vec[hi as usize].to_string())
    }

    Json(return_list.clone())
}