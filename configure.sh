#!/bin/bash
# Install nodejs
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
# Install npm dependencies
npm install
cd schedules
npm install
cd ..
# Start the server
./start.sh
