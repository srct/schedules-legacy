#!/bin/bash
haveProg() {
    [ -x "$(which $1)" ]
}

if haveProg apt-get ; then func_apt-get
elif haveProg yum ; then func_yum #TODO
elif haveProg yum ; then func_packman #TODO
elif haveProg brew ; then func_brew
else
    echo 'No package manager found!'
    exit 2
fi

func_apt-get() {
    if
    # Install nodejs
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install nodejs
}
func_yum() {
    #TODO
}
func_packman() {
    #TODO
}
func_brew() {
    brew update
    brew install node npm #both, just in case
}

# Install npm dependencies
npm install
cd schedules
npm install
cd ..
# Start the server
./start.sh
