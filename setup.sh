yes | curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
yes | apt install chromium
chmod 777 ./startserver.sh
chmod 777 ./open_browsers.sh
mkdir ./database
touch ./database/database.sqlite
xterm -e ./startserver.sh
xterm -e ./open_browsers.sh
exit