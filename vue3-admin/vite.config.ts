import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// Vite官方配置
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
