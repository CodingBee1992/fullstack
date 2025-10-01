import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  base:'/fullstack/',
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      "/api/":"http://localhost:1337",
      "/uploads/":"http://localhost:1337"
    }
  },
  // build:{
  //   outDir:'../backend/dist'
  // }
})
