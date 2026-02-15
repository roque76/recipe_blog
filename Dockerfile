FROM php:8.3-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache \
    git curl zip unzip bash \
    libpng-dev oniguruma-dev libxml2-dev \
    postgresql-dev nodejs npm

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-interaction --prefer-dist
RUN npm install && npm run build

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8000 5173

CMD ["/start.sh"]