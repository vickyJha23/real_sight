import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    // three.js is ~540 kB on its own; it is lazy-loaded after the hero text, so the warning is expected.
    chunkSizeWarningLimit: 600,
  },
})
