yes | curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup toolchain install nightly
mkdir ./database
touch ./database/database.sqlite
cargo build
cargo run
curl 'http://172.25.4.64:8000/test'
chromium-browser http://172.25.4.64:8000
chromium-browser http://172.25.3.64:8000/leaderboard