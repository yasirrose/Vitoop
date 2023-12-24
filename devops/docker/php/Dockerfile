FROM surnet/alpine-wkhtmltopdf:3.16.2-0.12.6-full as wkhtmltopdf
FROM php:8.1-fpm-alpine

ENV NODE_PACKAGE_URL  https://unofficial-builds.nodejs.org/download/release/v20.9.0/node-v20.9.0-linux-x64-musl.tar.gz

RUN apk add --no-cache \
    unzip \
    git \
    imap-dev \
    krb5-dev \
    libzip-dev \
    zlib-dev \
    icu-dev \
    libxml2-dev \
    curl \
    gnupg \
    build-base \
    xorg-server \
    xvfb \
    libjpeg-turbo \
   # wkhtmltopdf dependencies
    libstdc++ \
    libx11 \
    libxrender \
    libxext \
    openssl-dev  \
    openssl3 \
    ca-certificates \
    fontconfig \
    freetype-dev \
    ttf-dejavu \
    ttf-droid \
    ttf-freefont \
    ttf-liberation \
    bash \
   # more fonts
     && apk add --no-cache --virtual .build-deps \
       msttcorefonts-installer \
     # Install microsoft fonts
     && update-ms-fonts \
     && fc-cache -f \
   # NPM
   # && apk add --update --no-cache nodejs npm \
   # Clean up when done
   && rm -rf /tmp/* \
   && apk del .build-deps

# Build node specific version
WORKDIR /opt
RUN wget $NODE_PACKAGE_URL
RUN mkdir -p /opt/nodejs
RUN tar -zxvf *.tar.gz --directory /opt/nodejs --strip-components=1
RUN rm *.tar.gz
RUN ln -s /opt/nodejs/bin/node /usr/local/bin/node
RUN ln -s /opt/nodejs/bin/npm /usr/local/bin/npm

# Copy wkhtmltopdf from exitent image
COPY --from=wkhtmltopdf /bin/wkhtmltopdf /bin/wkhtmltopdf
COPY --from=wkhtmltopdf /bin/wkhtmltoimage /bin/wkhtmltoimage


# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli intl zip xml fileinfo exif

RUN apk add --no-cache \
        libjpeg-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install -j$(nproc) imap

RUN apk add --no-cache $PHPIZE_DEPS \
    && apk add --update linux-headers \
    && pecl install xdebug  \
    && docker-php-ext-enable xdebug

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ADD configs/php.ini /usr/local/etc/php/conf.d/php.ini

WORKDIR /srv
