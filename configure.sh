#!/bin/bash
haveProg() {
    [ -x "$(which $1)" ]
}
pause() {
   read -p "$*"
}

if haveProg apt-get ; then func_apt-get
elif haveProg yum ; then func_yum
elif haveProg pacman ; then func_pacman
elif haveProg brew ; then func_brew
elif haveProg emerge ; then func_emerge
elif haveProg zypper ; then func_zypper
elif haveProg pkg ; then func_pkg
elif haveProg port ; then func_port
elif haveProg pkgin ; then func_pkgin
else
    echo 'No supported package manager found!'
    exit 2
fi

#TODO: Add 'update' commands to these commands
func_apt-get() {
    if
    # Install nodejs
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install nodejs
}
func_yum() {
    sudo curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
    sudo yum -y install nodejs
}
func_pacman() {
    sudo pacman -S nodejs npm
}
func_brew() {
    brew update
    brew install node npm #both, just in case
}
func_zypper() {
    echo "Go here: http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs"
    echo "Follow the instructions on the Suse website in a different terminal"
    pause 'Press [Enter] key when you have nodejs installed'
    #Because the SuSE commands were version specific so I give up
}
func_emerge() {
    emerge nodejs
}
func_pkg() {
    pkg install node
}
func_port() {
    port install nodejs
}
func_pkgin() {
    pkgin -y install nodejs
}

# Install npm dependencies
npm install
cd schedules
npm install
cd ..

echo "** Installation Completed **"
echo "Run './start.sh' to run the server"
