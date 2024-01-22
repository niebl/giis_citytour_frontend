import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

const root =  resolve(__dirname, 'src')
const outDir =  resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/giis_citytour_frontend/',
  root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'game', 'index.html'),
      }
    }
  }
})
