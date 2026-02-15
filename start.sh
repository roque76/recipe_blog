#!/bin/sh

# Install node dependencies if needed
npm install

# Run migrations
php artisan migrate --force

# Start Vite dev server in background
npm run dev &

# Start Laravel
php artisan serve --host=0.0.0.0 --port=8000