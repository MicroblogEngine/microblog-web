import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import runtimeEnv from 'vite-plugin-runtime-env';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src"),
      "@/helpers": path.join(__dirname, "src", "helpers"),
      "@/models": path.join(__dirname, "src", "models"),
      "@/states": path.join(__dirname, "src", "states"),
      "@/components": path.join(__dirname, "src", "components"),
    },
  },  
  plugins: [
    react(), 
    svgr(),
    runtimeEnv()
  ],
})
