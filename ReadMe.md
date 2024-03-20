# Touch Typing Website - My Computer Science Coursework

## Overview
This project is a web server built using the Rocket framework in Rust. It provides APIs for interacting with a database and serves Javascript for the front-end of the website.

## Features
- **User Authentication**: Users can sign up, login, and access their tests from anywhere they can access the server.
- **Test Management**: Allows users to create tests and retrieve their test data.
- **Leaderboard**: Provides a leaderboard of users based on their test performance.

## Setup

>[!NOTE]
>You will need to have Rust and sqlite installed
> - [Rustup - Rust Installer](https://rustup.rs/)
> - [SQLITE - Installation Tutorial](https://www.sqlitetutorial.net/download-install-sqlite/)

1. Clone the repository: `git clone https://github.com/ArloFilley/cs_coursework`
2. Navigate to the project directory: `cd cs_coursework`
3. Install dependencies: `cargo build`

## Usage
1. Start the server: 
    `cargo run`
2. By Default the server runs on `http://localhost:8000` This can be changed by creating a `Rocket.toml` file
3. Front end will be acessible through `http://url/typing/`

>[!CAUTION]
>The hashing algorithm used by this project is a basic one and should not be considered safe enough to use any password that is used on another site. Proceed at your own risk

4. Access the API endpoints:
   - User-related endpoints:
     - Sign up: `POST /api/create_user`
     - Login: `GET /api/login/<username>/<password>`
     - Get user tests: `GET /api/get_tests/<user_id>/<secret>`
     - Leaderboard: `GET /api/leaderboard`
   - Test-related endpoints:
     - Create test: `POST /api/post_test`
     - New test: `GET /api/new_test`

## Dependencies
- **Rocket**: Web framework for Rust.
- **Serde**: Serialization and deserialization library for Rust.
- **Rusqlite**: SQLite database driver for Rust.
- **Rand**: Random number generation library for Rust.

## Contributors
- [Arlo Filley](https://github.com/ArloFilley)

## License
This project is licensed under the [MIT License](LICENSE).