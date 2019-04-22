OS := $(shell uname)

start_dev:
ifeq ($(OS),Darwin)
	docker volume create --name=app-vitoop

	docker-compose -f docker-compose.dev.yml up -d
	docker-sync start
else
	docker-compose -f docker-compose.dev.yml up -d
endif

start:
	docker-compose -f docker-compose.yml up -d

stop_dev:
ifeq ($(OS),Darwin)
	docker-compose -f docker-compose.dev.yml down
	docker-sync stop
	docker-sync clean
else
	docker-compose -f docker-compose.dev.yml down
endif

stop:
	docker-compose -f docker-compose.yml down

install:
	cp devops/docker/app/parameters.yml application/app/config/parameters.yml
	docker-compose exec php sh -c 'composer install --optimize-autoloader && php bin/console doc:migr:migr --no-interaction && php bin/console assets:install --env=prod && php bin/console cache:clear --env=prod && chmod -R 0777 var/cache var/logs  && npm install && npm install -g gulp-cli && gulp && chmod -R 0777 var/cache var/logs'

load_db:
	docker exec -i $$(docker-compose ps -q vitoopdb) mysql --user=root --password=root --execute="DROP DATABASE IF EXISTS vitoopdb; CREATE DATABASE IF NOT EXISTS vitoopdb;"
	cat ${path} | docker exec -i $$(docker-compose ps -q vitoopdb) mysql -u root --password=root vitoop
