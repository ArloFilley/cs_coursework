yes | apt install chromium curl build-essential
yes 1 | curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
mkdir ./database && touch ./database/database.sqlite
chmod 777 ./openbrowsers.sh ./startserver.sh ./testserver.sh
./startserver.sh &
./testserver.sh &
./openbrowsers.sh &
exit