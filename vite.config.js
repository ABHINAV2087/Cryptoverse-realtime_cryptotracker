import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
 
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vercel()],
});