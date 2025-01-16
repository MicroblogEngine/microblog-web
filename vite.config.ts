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
      "@/validation": path.join(__dirname, "src", "validation"),
      "@/types": path.join(__dirname, "src", "types"),
    },
  },  
  plugins: [
    TanStackRouterVite(),
    react(), 
    svgr(),
    runtimeEnv()
  ],
})
