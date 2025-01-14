/// <reference types="vitest" />
/// <reference types="vite/client" />
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
      "@/components": path.join(__dirname, "src", "components"),
      "@/helpers": path.join(__dirname, "src", "helpers"),
      "@/models": path.join(__dirname, "src", "models"),
      "@/reducers": path.join(__dirname, "src", "reducers"),
      "@/states": path.join(__dirname, "src", "states"),
    },
  },  
  plugins: [
    react(), 
    svgr(),
    runtimeEnv()
  ],
})
