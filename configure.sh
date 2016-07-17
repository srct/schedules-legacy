#!/bin/bash +x
function haveProg() {
    [ -x "$(which "$1")" ]
}
function pause() {
   read -r -p "$*"
}

#TODO: Add 'update' commands to these commands
function func_apt-get() {
    # Install nodejs
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install nodejs
}
function func_yum() {
    sudo curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
    sudo yum -y install nodejs
}
function func_pacman() {
    sudo pacman -S nodejs npm
}
function func_brew() {
    brew update
    brew install node npm #both, just in case
}
function func_zypper() {
    echo "Go here: http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs"
    echo "Follow the instructions on the SUSE website in a different terminal"
    pause 'Press [Enter] key when you have nodejs installed'
    #Because the SUSE commands were version specific so I give up
}
function func_emerge() {
    emerge nodejs
}
function func_pkg() {
    pkg install node
}
function func_port() {
    port install nodejs
}
function func_pkgin() {
    pkgin -y install nodejs
}
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
    echo 'No supported package manager found!'
    read -r -p "Do you want to continue (you'll need nodejs and npm) [y/N] " response
    case $response in
        [yY][eE][sS]|[yY])
            #Continues script
            ;;
        *)
            exit 2
            ;;
    esac
fi

echo "** Installation Completed **"
echo "Run './start.sh' to run the server"
