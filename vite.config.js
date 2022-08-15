import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  //plugins: [react()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/index.jsx'
    }
  }
})

// vite.config.js
/*
export default defineConfig({
  plugins: [react()],
  build: {
    // generate manifest.json in outDir
    //manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/index.jsx'
    }
  }
})
*/



/*

*/