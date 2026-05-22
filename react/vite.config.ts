import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../_site',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/react.[hash].js',
        chunkFileNames: 'assets/chunk-[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
