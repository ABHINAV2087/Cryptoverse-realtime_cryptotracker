import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  server: {
    port: process.env.PORT || 3000, // Use the PORT from environment or fallback to 3000
  },
  plugins: [react(), vercel()],
});
