echo "[setup.sh] Dev machine:"
uname -a

echo -e "[setup.sh] Installing libraries..."
npm install -g npm@latest eas-cli@latest

echo -e "[setup.sh] Performing npm install..."
npm install

echo -e "[setup.sh] Installing watchman..."
sudo apt update
sudo apt install watchman
watchman version