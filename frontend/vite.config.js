import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/again_really/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Again? Really?',
        short_name: 'Again? Really?',
        description: 'Expense tracker app',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        start_url: '/again_really/',
        icons: [
          {
            src: '/again_really/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/again_really/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        devOptions: {
          enabled: true
        }
      }
    })
  ],
  server: {
    host: true
  }
})
