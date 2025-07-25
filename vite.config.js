import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/my-gemini-clone",
  build: {
    rollupOptions: {
      external: ['marked'], // Add this line
      output: {
        manualChunks: {
          marked: ['marked'] // Optional optimization
        }
      }
    }
  }
})