import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép điện thoại cùng mạng Wifi truy cập trực tiếp
    port: 5173,
  },
})
