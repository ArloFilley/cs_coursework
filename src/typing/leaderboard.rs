use rocket::serde::json::Json;
use crate::typing::sql::{
    get_leaderboard,
    LeaderBoardTest
};

/// Returns the highest test data from each user as
/// a json array
/// Acessible from http://url/api/leaderboard
#[get("/leaderboard")]
pub fn leaderboard() -> Json<Vec<LeaderBoardTest>> {
    let leaderboard: Vec<LeaderBoardTest> = get_leaderboard(0).expect("error finding user_id");
    Json(leaderboard)
}