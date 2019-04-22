#!/bin/bash

cd /home/$USER/xxx/server/ &&

make start &&
echo ""
echo "-----> make start is finished"
echo ""

make install
echo ""
echo "-----> make install is finished"
echo ""

#make stop 

# remove folder 
#if [ -e /home/$USER/xxx/server/devops/docker/states/db/vitoop ]; then
#    sudo rm -r /home/$USER/xxx/server/devops/docker/states/db/vitoop
#else 
#    echo "There is no: /home/$USER/xxx/server/devops/docker/states/db/vitoop"
#fi

# add folder
#mkdir /home/$USER/xxx/server/devops/docker/states/db/vitoop &&
#echo 
#echo "added folder: /home/$USER/xxx/server/devops/docker/states/db/vitoop"
#echo

#cd /home/$USER/xxx/server/

#make start

make load_db path=/home/$USER/xxx/data
if [ $? = 0 ]; then
    echo "---> DB is pulled"
    tput init  #Autofarbe setzen
    echo
else
    echo ""
    echo -e "\033[1;31m---> DB is not pulled."
    tput init  #Autofarbe setzen
    echo
fi

# open browser with URL
xdg-open http://localhost:8080
