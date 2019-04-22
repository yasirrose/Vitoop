#!/bin/bash

# OS Info___________________________________________________________________
echo ""
echo ""
echo "   #########################################################################"
echo ""
echo -e "\033[1;39m   Installation for vitoop:"
tput init  #set autocolor 
echo "   $(lsb_release -d)"
echo "   $(lsb_release -r)"
echo "   $(lsb_release -c)"
echo ""

if ping -q -c 1 -W 1 google.com >/dev/null; then #  
  echo "   Interntconnection works."
else
  echo -e "\033[1;31m   Interntconnection don't work."
fi

tput init  #set autocolor
echo ""
echo "   #########################################################################"
echo ""

docker=j
dockercompose=j

### Add user11 to sudo - only Debian____________________________________________
if [[ $(lsb_release -i) = *"Debian"* ]]; then
    echo
    echo -e "\033[1;39m   Bitte root-passwort eingeben"
    tput init  #Autofarbe setzen
    su root -c 'apt-get install sudo && adduser user11 sudo && echo "user11 ALL=(ALL) ALL" >> /etc/sudoers' > /dev/null 
    echo 
    echo -e "\033[1;39m   ---> user11 wurde zu sudo hinzugefügt."
    tput init  #Autofarbe setzen
fi

echo -e "\033[1;39m   ---> now it's sudo!"
tput init  #Autofarbe setzen
echo 

sudo apt-get update > /dev/null

# docker installieren__________________________________________________________
if [ $docker = "j" ];then
    echo
    echo -e "\033[1;39m   ----> Docker wird jetzt installiert ####################################"
    tput init  #Autofarbe setzen
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg2 make software-properties-common > /dev/null &&
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add - &&
    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
    $(lsb_release -cs) \
    stable" &&

    sudo apt-get update > /dev/null &&
    sudo apt-get install -y docker-ce > /dev/null &&
    docker --version
    echo "---> docker installed"
else
    echo "---> docker not installed"
fi

# dockercompose installieren__________________________________________________________
if [ $docker = "j" ]; then
    if [ $dockercompose = "j" ]; then
        echo
        echo -e "\033[1;39m   ----> Docker-Compose wird jetzt installiert ##############################"
        tput init  #Autofarbe setzen
        sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose # > /dev/null

        sudo chmod +x /usr/local/bin/docker-compose &&
        docker-compose --version
        echo ""
        echo "---> docker installed"
    else
        programm="Docker-Compose"
    echo "---> docker not installed"

    fi
fi


sudo usermod -aG docker $USER
echo
echo "Shutdown, log in again and go ahead with vitoop_install_2"
echo
