import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            wayfinder({
                phpBinary: 'C:/Users/JOHN/.config/herd/bin/php.exe',
                enabled: process.env.WAYFINDER_ENABLED === 'true',
            }),
        ],
        esbuild: {
            jsx: 'automatic',
        },

        server: {
            host: '0.0.0.0',
            port: 5173,
            hmr: {
                host: 'localhost',
            },
        },
    }
})