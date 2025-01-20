/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import svgr from "vite-plugin-svgr";
import runtimeEnv from 'vite-plugin-runtime-env';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src"),
      "@/components": path.join(__dirname, "src", "components"),
      "@/features": path.join(__dirname, "src", "features"),
      "@/helpers": path.join(__dirname, "src", "helpers"),
      "@/models": path.join(__dirname, "src", "models"),
      "@/reducers": path.join(__dirname, "src", "reducers"),
      "@/types": path.join(__dirname, "src", "types"),
      "@/validation": path.join(__dirname, "src", "validation"),
      "@/security": path.join(__dirname, "src", "security"),
    },
  },  
  plugins: [
    TanStackRouterVite(),
    react(), 
    svgr(),
    runtimeEnv()
  ],
})
