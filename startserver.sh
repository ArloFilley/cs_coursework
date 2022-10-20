rustup toolchain install nightly
cargo build
./testserver.sh &
./openbrowsers.sh &
cargo run