#!/bin/bash
# set var: current day of month
dayofmonth=`date '+%d'`
dayofweek=`date '+%A'`
verzeichnis=/var/customers/webs/vitoop

# set vars: database, user, password
# db_name should be the name of the subdir where the Typo3 site is installed

sourcedirectory1=vitoop/application
db1=vitoopsql1
user1=vitoopsql1
pass1=FbQuBcj2tx
 
mysqldump --opt -h localhost -u $user1 -p$pass1 $db1 | gzip > $verzeichnis/backups/databases/$sourcedirectory1.dump.sql.$dayofmonth.gz

# backup files

# backup vitoop.org
tar -cf $verzeichnis/backups/files/$sourcedirectory1.$dayofweek.tar $verzeichnis/$sourcedirectory1
gzip -f $verzeichnis/backups/files/$sourcedirectory1.$dayofweek.tar
