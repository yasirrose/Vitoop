OS := $(shell uname)

start_dev:
	docker-compose -f docker-compose.dev.yml up -d

start:
	docker-compose -f docker-compose.yml up -d

stop_dev:
	docker-compose -f docker-compose.dev.yml down

stop:
	docker-compose -f docker-compose.yml down

install:
	docker-compose exec php sh -c 'composer install --optimize-autoloader && php bin/console doc:migr:migr --no-interaction && php bin/console assets:install --env=prod && php bin/console cache:clear --env=prod && chmod -R 0777 var/cache var/log && npm install && npm run build && chmod -R 0777 var/cache var/log'

load_db:
	docker exec -i $$(docker-compose ps -q vitoopdb) mysql --user=root --password=root --execute="DROP DATABASE IF EXISTS vitoop; CREATE DATABASE IF NOT EXISTS vitoop;"
	cat ${path} | docker exec -i $$(docker-compose ps -q vitoopdb) mysql -u root --password=root vitoop

import_db:
	docker-compose exec vitoopdb sh -c 'mysql --user=root --password=root --binary-mode vitoop < /srv/backups/${path}'

export_db:
	docker-compose exec vitoopdb sh -c 'mysqldump --user=root --password=root vitoop > /srv/backups/${path}'

auto_import:
	docker-compose exec php sh -c 'php bin/console vitoop:auto:import'