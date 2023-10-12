#!/bin/bash
work_dir=$(pwd)
set -x
##################################################################

# TODO alle Progs, die erst später gebraucht werden im Script 1 insallieren
# Warum geht das Script erst mit den Mails los - und der fordere Teil wird weggelassen ???
# neuen Browser suchen +++++++++++ und Ende von Script1 und ba.sh entsprechend anpassen

# --> schauen ob die richtigen Crontabs drin sind 
# --> schauen, ob alle Scripte übertragen wurden



echo ' ##### Auflösung ändern auf 1184x800 #####'
xrandr --newmode "1440x900_60.00"  106.50  1440 1528 1672 1904  900 903 909 934 -hsync +vsync
xrandr --addmode Virtual1 "1440x900_60.00"
xrandr -s 1440x900
echo

# OS Info___________________________________________________________________
echo ""
echo ""
echo "   ######################################################################### "
echo ""
echo "Installation for vitoop:"
echo "   $(lsb_release -d)"
echo "   $(lsb_release -r)"
echo "   $(lsb_release -c)"
echo
#echo "   Anzahl Skripte: $(ls -l /home/$USER/scripte | wc -l)"
#echo "   Anzahl Pdf: $(ls -l /home/$USER/downloads/pdf | wc -l)"
#echo "   Anzahl Teli: $(ls -l /home/$USER/downloads/teli | wc -l)"
if [  -e /home/$USER/vitoop/dump.sql ]; then
	echo "   Db-Dump: ist vorhanden."
else
	echo "   Db-Dump: ist nicht vorhanden."
fi
echo

if ping -q -c 1 -W 1 google.com >/dev/null; then #  
  echo "   Interntconnection works."
else
  echo 'Interntconnection don t work.'
fi

echo ' ################# läuft nur mit << user11 >> ################### '

echo
echo ' ##########################################'
echo ' Grundsystem ist installiert und 
 der User ist zu sudo hinzugefügt
 dann kann es weitergehen ..'
echo ' ##########################################'
echo

read -p " --> Soll Google-Chrome installiert werden (ja/nein): " chrome_ant
echo

# Mail-Daten eingeben ################################################
read -p " --> Wird Gmail für In- und Export verwendet (ja/nein): " g_ant
echo
 if [[ $g_ant = "ja" ]]; then
   read -p "   Gmail-Adresse eingeben: " g_adr
   read -p "   Gmail-Passwort eingeben: " g_passwd
   mail_prov=gmail.com
   mail_adr=$g_adr
   mail_passwd=$g_passwd
 #elif [ xxx ]; then
   #echo "datei2 vorhanden"
 else
   echo
   echo "   -> Gmail-Adresse für Export eingeben:"
   read -p "   Gmail-Adresse eingeben: " g_adr
   read -p "   Gmail-Passwort eingeben: " g_passwd
   echo "   -> Mail-Adresse für Import eingeben:"
   read -p "   Mail-Provider eingeben: " mail_prov
   read -p "   Mail-Adresse eingeben: " mail_adr
   read -p "   Mail-Adresse-Passwort eingeben: " mail_passwd
 fi
 echo 
 echo "#####  Fragen ob die Angaben richtig sind - sonst exit #######"
 echo 

##################################################################################
sudo apt update 
sudo apt upgrade 
sudo apt install -y yad fonts-liberation libu2f-udev
# echo "#################################################"
# echo 
##################################################################################


# Automatische Auflösung einrichten ###########################################
echo " ###### Auflösung einrichten ######"
echo 'xrandr --newmode "1440x900_60.00"  106.50  1440 1528 1672 1904  900 903 909 934 -hsync +vsync
xrandr --addmode Virtual1 "1440x900_60.00"
xrandr -s 1440x900' > /home/$USER/45custom_xrandr-settings
sudo mv /home/$USER/45custom_xrandr-settings /etc/X11/Xsession.d/45custom_xrandr-settings
sudo chmod +x /etc/X11/Xsession.d/45custom_xrandr-settings
 
# Grub-Anzeige wird auf "0" gesetzt ###################################
echo ' ##### Änderungen an Grub #####'
sudo sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=0/g' /etc/default/grub
sudo update-grub
echo

echo " ##### Datei .env wird eingerichtet ######"
# in "sed" "#" statt "'" wegen "//" im Text
echo " ##### .env wird bearbeitet ##### "
# Gmail-Adresse einsezten (Mail verschicken von local) ##################################
sed -i "s#MAILER_URL=null://localhost#MAILER_URL=gmail://$g_adr:$g_passwd@localhost#g" /home/$USER/vitoop/application/.env.dist

# Andere Adresse einsetzen (Mail importieren von server) 
sed -i "s#EMAIL_IMPORT_URL=#EMAIL_IMPORT_URL='{imap.$mail_prov:993/ssl/novalidate-cert}INBOX'#g" /home/$USER/vitoop/application/.env.dist

sed -i "s#EMAIL_IMPORT_USER=#EMAIL_IMPORT_USER='$mail_adr'#g" /home/$USER/vitoop/application/.env.dist
sed -i "s#EMAIL_IMPORT_PASS=#EMAIL_IMPORT_PASS='$mail_passwd'#g" /home/$USER/vitoop/application/.env.dist

# TODO Frage einbauen ob Syonfony-Analyse ausgeschaltet werden soll
# Enter ist "ja"
sed -i "s#APP_ENV=dev#APP_ENV=prod#g" /home/$USER/vitoop/application/.env.dist

echo
echo ' ##### .env wird kopiert #####'
echo " application/.env.dist zu application/.env kopieren
 .. warum ist nicht klar"
sudo cp $work_dir/application/.env.dist $work_dir/application/.env
## sed -i 's/GRUB_TIMEOUT=5/GRUB_TIMEOUT=0/g' /home/$USER/vitoop/application/.env ##### muster für sed ###
echo 

# Scripte kopieren und ausführbar machen 
# TODO Werden wirklich alle Scripte kopiert ???
#sudo cp -v /home/$USER/scripte/*.sh /usr/local/bin/
#sudo chmod +x /usr/local/bin/*.sh
echo "--> Scripte wurden kopiert."
echo

##########################################################################################

# docker installieren_______________________________________________________
# TODO Ist mit dem Download und der Installation alles okay ++++++++++++++++++++++++++++++++
docker=j   # auf "j" setzen
dockercompose=j # auf "j" setzen

sudo apt-get update > /dev/null
if [ $docker = "j" ];then
    echo
    echo -e "\033[1;39m   ----> Docker wird jetzt installiert ######################"
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
        echo -e "\033[1;39m   ----> Docker-Compose wird jetzt installiert ####################"
        tput init  #Autofarbe setzen
        sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose # > /dev/null

        sudo chmod +x /usr/local/bin/docker-compose &&
        docker-compose --version
        echo ""
        echo "---> dockercompose installed"
    else
        programm="Docker-Compose"
    echo "---> dockercompose not installed"

    fi
fi
sudo chown $USER:$USER /var/run/docker.sock

echo
echo "$USER wird jetzt Docker hinzugefügt."
echo
sudo usermod -aG docker $USER
echo
sudo touch $work_dir/application/var/logs
echo "... /var/logs wurde erstellt"
echo
# sudo apt update && apt dist-upgrade  -------------- erstmal auskommentiert.
echo


if [ $chrome_ant = "ja" ]; then
	echo " ###### Google-Chrome installieren ######"
	wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub > linux_signing_key.pub
	sudo install -D -o root -g root -m 644 linux_signing_key.pub /etc/apt/keyrings/linux_signing_key.pub
	sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/linux_signing_key.pub] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
	sudo apt update
	sudo apt install -y google-chrome-stable
else
	echo "Google-Chrome wird nicht installiert."
fi
sudo rm -rf $work_dir/devops/docker/states/db/vitoop

 
# echo " ##### in 5 sec. wird reboot #####"
# sleep 5
# sudo reboot

# ################ das funktioniert nicht ########################
# Changing Script for new boot. 
#touch /home/$USER/boot.sh 
#echo " ###### touch"
#sudo chmod +x /home/$USER/boot.sh
#echo " ###### chmod"
#echo '#!/bin/bash 
#/home/$USER/script3.sh' > /home/$USER/boot.sh
#echo " ###### eintrag .bashrc"

# Crontab @reboot für ~/boot.sh
#crontab -l > cronedit
#echo '@reboot bash /home/$USER/boot.sh' >> cronedit
#crontab cronedit
#rm cronedit

#echo " ##### PC wird in 5 sec. neu gestartet #####"
# sleep 5 
# sudo reboot 



