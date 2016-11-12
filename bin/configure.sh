#!/bin/bash

# Open up version variables
. /etc/lsb-release
### For example:
### DISTRIB_ID=Ubuntu
### DISTRIB_RELEASE=12.04
### DISTRIB_CODENAME=precise
### DISTRIB_DESCRIPTION="Ubuntu 12.04.2 LTS"

# Check if you have a given program
function haveProg() {
  [ -x "$(which "$1")" ]
}

## Installation script for Ubuntu
if [ "$DISTRIB_ID" == "Ubuntu" ]
  then
    echo "** Installing as Ubuntu"
    echo ""
    if ! haveProg npm
      then
        echo "** Installing Node.js"
        curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
        sudo apt-get install -y nodejs npm
    fi
    #if ! haveProg redis-server
    #  then
    #    echo "** Installing redis-server"
    #    sudo apt-get install -y redis-server
    #    sudo mv /etc/redis/redis.conf /etc/redis/redis.conf.backup
    #    sudo cp setupFiles/redis.conf /etc/redis/redis.conf
    #    echo "** redis-server installed and configured"
    #fi
elif haveProg yum
  then
    echo "** Installing as yum manager"
    echo ""
    echo "** yum not yet supported, go to https://git.gmu.edu/srct/schedules for help"
    exit 1
# Handler for mac and macports
elif haveProg brew
  then
    brew update
    brew install node npm
    if ! haveProg mongo
      then
        brew install mongodb
    fi
elif haveProg port
  then
    sudo port selfupdate
    sudo port install nodejs
    if ! haveProg mongo
      then
        sudo port install mongodb
    fi
fi

## Install node.js dependencies
npm install
cd schedules
npm install
cd ..
cd dataScrapers/GMU
npm install
cd ../..

echo "** installing nodemon"

if ! haveProg nodemon
  then
    sudo npm install -g nodemon
  else
    echo "** nodemon installed already"
fi

echo "** Application installed successfuly"
echo ""
echo "** Run ./start.sh to start application"
exit 0
