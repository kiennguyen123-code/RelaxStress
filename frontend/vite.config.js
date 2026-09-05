import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true, // Cho phép truy cập từ mọi domain bên ngoài (Cloudflare tunnel, ngrok, v.v.)
  },
})
