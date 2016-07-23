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
        sudo apt-get install -y nodejs
    fi
    if ! haveProg mongod
      then
        echo "** Installing MongoDB"
        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
        echo "deb http://repo.mongodb.org/apt/ubuntu $DISTRIB_CODENAME/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
        sudo apt-get update
        sudo apt-get install -y mongodb-org
        ## Service is started in start.sh file
    fi
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
echo "** Application installed successfuly"
echo ""
echo "** Run ./start.sh to start application"
exit 0
