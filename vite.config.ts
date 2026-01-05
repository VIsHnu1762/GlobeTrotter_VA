import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './client/src'),
            '@contexts': path.resolve(__dirname, './client/src/contexts'),
            '@hooks': path.resolve(__dirname, './client/src/hooks'),
            '@services': path.resolve(__dirname, './client/src/services'),
            '@utils': path.resolve(__dirname, './client/src/utils'),
        },
    },
    open: true
}
})
