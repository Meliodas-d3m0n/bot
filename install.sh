#!/data/data/com.termux/files/usr/bin/bash

apt-get update
apt-get upgrade
pkg i yarn
pkg i ffmpeg
pkg i wget
pkg i nodejs
pkg i figlet
pkg i ruby
gem install lolcat
yarn
yarn add g-i-s 
clear
figlet -f slant "Meliodas" |lolcat
echo "USE \"node merrioda.js\" para gerar o código qr" |lolcat -a -d 100