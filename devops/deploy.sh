#!/usr/bin/env bash

git pull origin master

composer install

php bin/console doc:migr:migr
php bin/console cache:clear --env=prod

gulp prod