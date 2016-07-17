#!/bin/bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
npm install
cd schedules
npm install
cd ..
./start
