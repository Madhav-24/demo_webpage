import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// React's Vite plugin supplies JSX transformation and development tooling.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/demo_webpage",
})
