#!/usr/bin/env bash
. ~/.bashrc

git pull origin master

cd application
composer install --optimize-autoloader
composer dump-autoload --optimize --no-dev --classmap-authoritative

php bin/console doc:migr:migr --no-interaction
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

node_modules/.bin/gulp