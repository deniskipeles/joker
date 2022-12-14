import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/*
import reactRefresh from '@vitejs/plugin-react-refresh'

export default {
  plugins: [reactRefresh()]
}
*/

export default defineConfig({
  server:{hmr:{overlay:false}},
  plugins: [react()],
  //base:'./',
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
"share_target": {
      "action": "/share-photo",
      "method": "POST",
      "enctype": "multipart/form-data",
      "params": {
        "title": "name",
        "text": "description",
        "url": "link",
        "files": [
          {
            "name": "photos",
            "accept": "image/png"
          }
        ]
      }
    },
*/