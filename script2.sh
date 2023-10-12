#!/bin/bash
work_dir=$(pwd)
set -x

echo
echo "Vitoop wird jetzt installiert."
echo


# Ordner für pdf einrichten
# TODO das Anlegen scheint nicht zu funktionieren 
sudo mkdir $work_dir/downloads
sudo mkdir $work_dir/downloads/teli
sudo mkdir $work_dir/downloads/pdf
#sudo rm -rf $work_dir/devops/docker/states/db/vitoop
#########################################################################################
####### Crontab und Service einrichten #################################################

# echo " ##### Mail-Abfrage in /usr/local/bin einrichten #####"


cd $work_dir
docker-compose up -d --build
docker exec -i $(docker-compose ps -q vitoopdb) mysql --user=root --password=root --binary-mode vitoop < dump.sql
docker-compose exec php sh -c 'php bin/console vitoop:data:init'
make load_db path=$work_dir/dump.sql
make install 

echo " ##### Service in /etc/systemd/system/ einrichten #####"
touch /home/$USER/vitoop.service
echo '[Unit]
Description=Wird ausgeführt bei vitoop
PartOf=docker.service
After=docker.service

[Service]
Environment=DISPLAY=:0
Type=oneshot
RemainAfterExit=true
WorkingDirectory=$work_dir
User=$USER
ExecStart=/usr/local/bin/docker-compose -f docker-compose.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.yml down

[Install]
WantedBy=multi-user.target' > /home/$USER/vitoop.service # vitoop.service einrichten
sudo mv /home/$USER/vitoop.service /etc/systemd/system/vitoop.service # verschieben
sudo chmod +x /etc/systemd/system/vitoop.service # ausführbar machen
sudo systemctl enable vitoop.service
sudo systemctl start vitoop.service

# zuletzt crontab anlegen, weil er sonst ständig Popups produziert.
# vielleicht vorhandene CronJobs löschen
crontab -r
# dann die CronJobs anlegen
crontab -l > cronedit
echo '*/1 * * * * /bin/bash /usr/local/bin/mail_import.sh > /dev/null' >> cronedit 
echo '*/7 * * * * /bin/bash /usr/local/bin/download.sh > /dev/null' >> cronedit 
crontab cronedit
rm cronedit

# open browser with URL
google-chrome http://localhost:8080 --start-fullscreen

