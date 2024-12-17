import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/helpers": path.join(__dirname, "src", "helpers"),
      "@/models": path.join(__dirname, "src", "models"),
      "@/states": path.join(__dirname, "src", "states"),
    },
  },  
  plugins: [react()],
})
