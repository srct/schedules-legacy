#!/bin/bash +x
# Function to test whether or not a program is installed on the users machine
function haveProg() {
    [ -x "$(which "$1")" ]
}
# Function to pause excecution till the user presses the enter key
function pause() {
   read -r -p "$*"
}

#TODO: Add 'update' commands to these commands

# Handler for Debian based systems with apt
function func_apt-get() {
    # Install nodejs
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install nodejs
}
# Handler for systems such as Fedora with yum
function func_yum() {
    sudo curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
    sudo yum -y install nodejs
}
# Handler for Arch based systems with pacman
function func_pacman() {
    sudo pacman -S nodejs npm
}
# Handler for macOS and others with homebrew
function func_brew() {
    brew update
    brew install node npm #both, just in case
}
# Function to tell SUSE users to do it themselves because there are version specific instructions
function func_zypper() {
    echo "Go here: http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs"
    echo "Follow the instructions on the SUSE website in a different terminal"
    # Close with error code 1
    end 1;
    #Because the SUSE commands were version specific so I give up
}
# Handler for Gentoo systems with emerge
function func_emerge() {
    emerge nodejs
}
# Handler for FreeBSD and other systems with pkg
function func_pkg() {
    pkg install node
}
# Handler for macOS and others with MacPorts - because some people hate Homebrew
function func_port() {
    port install nodejs
}
# Handler for a variety of other systems with pkgin
function func_pkgin() {
    pkgin -y install nodejs
}
# Function which installs dependencies for the project
function func_dependencies {
    # Install nodemon
    if haveProg nodemon ; then echo "** nodemon already installed **"
    else sudo npm install -g nodemon
    fi
    # Install npm dependencies
    npm install
    cd schedules || exit
    npm install
    cd ..
}



# Skip all of this if you have node or nodejs
if haveProg node ; then echo "** Node already installed **"
elif haveProg nodejs ; then echo "** Node already installed **"
elif haveProg apt-get ; then func_apt-get
elif haveProg yum ; then func_yum
elif haveProg pacman ; then func_pacman
elif haveProg brew ; then func_brew
elif haveProg emerge ; then func_emerge
elif haveProg zypper ; then func_zypper
elif haveProg pkg ; then func_pkg
elif haveProg port ; then func_port
elif haveProg pkgin ; then func_pkgin
else
    echo '** No supported package manager found!'
    echo '** Node.js not found!'
    exit 1
fi

# Install dependencies regardless
func_dependencies
echo "** Installation Completed **"
echo "** Run './start.sh' to run the server"
