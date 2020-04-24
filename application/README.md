Vitoop Project

Commands:

 Start prod enviroument

```sh

make start 

```

 Install all dependencies and get last packages and updates

```sh

make install 

```

 Load dump from mysql in project

```sh

make load_db path=<path_to_mysqldump.sql> 

```
 For local version please use commands (`filename_of_mysqldump` - filename in folder `backups`):
 ```sh
 
 make import_db path=<filename_of_mysqldump.sql> 
 make export_db path=<filename_of_mysqldump.sql> 
 
 ```


 
 Stop prod enviroument
 
 ```sh
 
 make stop 
 
 ```

Cron
```shell script
php bin/console enqueue:consume --message-limit=1 --time-limit="30 seconds" # Consume messages for sending 
```