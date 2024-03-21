use rocket::{
    http::Status,
    serde::{json::Json, Deserialize, Serialize},
    State,
};

use rand::{distributions::Alphanumeric, Rng};

use crate::api::sql::{Database, Test};

/// Struct representing the user
#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User<'r> {
    username: &'r str,
    password: &'r str,
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

    match database
        .create_user(user.username, &sha256::digest(user.password), &secret)
        .await
    {
        Err(why) => {
            println!("A database error occured during signup, {why}");
        }
        Ok(()) => {
            println!("Succesfully Signed up User: {}", user.username);
        }
    }
}

/// Retrieves tests associated with a specific user from the database and returns them as a JSON array.
///
/// # Endpoint
///
/// GET /api/get_tests/<user_id>/<secret>
///
/// # Path Parameters
///
/// - `user_id`: User ID of the user whose tests need to be retrieved.
/// - `secret`: Secret key for authentication.
///
/// # Returns
///
/// Returns a JSON array containing the user's tests if the user is authenticated and the tests are found.
///
/// If the user authentication fails, returns a `401 Unauthorized` status.
///
/// If the tests are not found or any database-related error occurs, returns a `404 Not Found` status.
///
/// # Example Request
///
/// ```bash
/// curl -X GET "https://example.com/api/get_tests/123/your_secret_key_here"
/// ```
///
/// # Example Response
///
/// ```json
/// [
///   {
///     "test_type": "typing",
///     "test_length": 100,
///     "test_time": 300,
///     "test_seed": 987654321,
///     "quote_id": 123,
///     "wpm": 65,
///     "accuracy": 98
///   },
///   {
///     "test_type": "multiple_choice",
///     "test_length": 50,
///     "test_time": 150,
///     "test_seed": 123456789,
///     "quote_id": null,
///     "wpm": null,
///     "accuracy": 85
///   }
/// ]
/// ```

#[get("/get_tests/<user_id>/<secret>")]
pub async fn get_tests(user_id: u32, secret: &str, database: &State<Database>) -> Result<Json<Vec<Test>>, Status> {
    match database.authenticate_user(user_id, &secret).await {
        Err(_) => return Err(Status::InternalServerError),
        Ok(authenticated) => {
            if !authenticated {
                return Err(Status::Unauthorized);
            }
        }
    }

    match database.get_user_tests(user_id, &secret).await {
        Err(why) => {
            println!("A database error occured during getting_tests, {why}");
            Err(Status::NotFound)
        }
        Ok(tests) => {
            println!("Succesfully Found Tests for User {user_id}");
            Ok(Json(tests))
        }
    }
}

/// takes the users login information and returns the users user id
/// which can be used to identify their tests etc.
/// Accessible from http://url/api/login
#[get("/login/<username>/<password>")]
pub async fn login(
    username: &str,
    password: &str,
    database: &State<Database>,
) -> Json<Option<LoginResponse>> {
    match database
        .find_user(username, &sha256::digest(password))
        .await
    {
        Err(why) => {
            println!("A database error occured during login for {username}, {why}");
            Json(None)
        }
        Ok(user) => match user {
            None => Json(None),
            Some(user) => Json(Some(LoginResponse {
                user_id: user.0,
                secret: user.1,
            })),
        },
    }
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginResponse {
    user_id: u32,
    secret: String,
}
