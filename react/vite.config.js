import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: '../assets/js/_react',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
        chunkFileNames: 'chunk-[hash].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
