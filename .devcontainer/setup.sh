echo "[setup.sh] Dev machine:"
uname -a

echo -e "[setup.sh] Installing npm..."
npm install

echo -e "[setup.sh] Installing watchman..."
sudo apt update
sudo apt install watchman
watchman version

echo -e "[setup.sh] *******************************"
echo -e "[setup.sh] Dev container ready!"
echo -e "[setup.sh] *******************************"