import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [react()],
  ssr: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@apollo/client': '@apollo/client', // Update the alias to the correct path
    },
  },
});
