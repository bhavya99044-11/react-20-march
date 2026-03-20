import {resolve} from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
   server: {
    host: '0.0.0.0',
    port: 5173, // or your desired port
    watch: {
      ignored: ['**/database/db.json'], // Use glob patterns
    },
  },
  plugins: [
    react(),
    tailwindcss(), // Add the plugin here
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  }
});
