import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tokens': resolve(__dirname, './tokens'),
      // Local shim – real @doordash/prism-react is installed but ListCell API differs
      '@doordash/prism-react': resolve(__dirname, './src/lib/prism-react/index.tsx'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'mx-pedregal-portal-proto.js',
        chunkFileNames: 'mx-pedregal-portal-proto/[name].js',
        assetFileNames: 'mx-pedregal-portal-proto/[name].[ext]',
      },
    },
  },
  base: './',
});
