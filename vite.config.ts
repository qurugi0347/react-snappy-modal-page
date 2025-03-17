import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@linaria/vite'
import wyw from '@wyw-in-js/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wyw()],
  server: {
    allowedHosts: ['8194-58-72-40-45.ngrok-free.app', 'localhost']
  }
})
