import path from 'path';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  ssr: {
    noExternal: ['@reduxjs/toolkit'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
