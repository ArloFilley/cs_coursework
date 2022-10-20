yes | curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
apt install chromium
rustup toolchain install nightly
mkdir ./database
touch ./database/database.sqlite
cargo build
cargo run