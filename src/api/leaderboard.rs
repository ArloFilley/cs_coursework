use crate::api::sql::{Database, LeaderBoardTest};
use rocket::{serde::json::Json, State};

type LeaderBoardTests = Vec<LeaderBoardTest>;

/// Returns the highest test data from each user as
/// a json array
/// Acessible from http://url/api/leaderboard
#[get("/leaderboard")]
pub async fn leaderboard(database: &State<Database>) -> Option<Json<LeaderBoardTests>> {
    let leaderboard = match database.get_leaderboard(0).await {
        Err(why) => {
            println!("Error getting leaderboard, {why}");
            return None;
        }
        Ok(leaderboard) => leaderboard,
    };

    Some(Json(leaderboard))
}
