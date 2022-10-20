yes | curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
yes | apt install chromium
mkdir ./database && touch ./database/database.sqlite
chmod 777 ./openbrowsers.sh ./startserver.sh ./testserver.sh
exit