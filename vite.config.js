import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'logo.png',
        'icons/icon-192.png',
        'icons/icon-512.png'
      ],
      manifest: {
        name: 'Maná en Casa',
        short_name: 'Maná',
        description: 'Acompañamiento integrativo para tu bienestar, desde casa y a tu ritmo.',
        theme_color: '#6A9033',
        background_color: '#FAFAF6',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
  {
    src: '/icon-192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: '/icon-512.png',
    sizes: '512x512',
    type: 'image/png'
  }
]
      }
    })
  ]
})