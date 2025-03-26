import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        dashboard: './src/apps/dashboard/main.js',
        ecommerce: './src/apps/ecommerce/main.js',
      },
    },
  },
})
