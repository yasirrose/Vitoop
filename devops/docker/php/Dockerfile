FROM php:7.1-fpm

# Fix permissions on Mac
RUN usermod -u 1000 www-data \
 && usermod -G staff www-data

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    unzip \
    git \
    libc-client-dev \
    libkrb5-dev \
    zlib1g-dev \
    libicu-dev \
    libxml2-dev \
    apt-transport-https\
    curl \
    gnupg \
    fontconfig \
    fontconfig-config \
    libx11-dev \
    libxext6 \
    libxrender1 \
    build-essential \
    xorg \
    xvfb \
    libjpeg62-turbo \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash -  \
    && apt-get install -y nodejs \
    && curl -o wkhtmltox.deb -SL https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.stretch_amd64.deb \
    && echo '7e35a63f9db14f93ec7feeb0fce76b30c08f2057 wkhtmltox.deb' | sha1sum -c - \
    && dpkg --force-depends -i wkhtmltox.deb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* wkhtmltox.deb


# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli intl zip xml fileinfo mbstring exif

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN pecl install xdebug && docker-php-ext-enable xdebug

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /srv