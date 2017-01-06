FROM php:7.0.12-apache
MAINTAINER Nat Hamilton <info@nathamilton.com>

# apt-get
RUN apt-get update
RUN apt-get -y install bzip2 git nano
RUN apt-get -y install libmcrypt-dev libzzip-dev zziplib-bin zlib1g-dev

# docker-php ext-install:
RUN docker-php-ext-install mcrypt
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo_mysql

# apache mods:
RUN a2enmod rewrite
