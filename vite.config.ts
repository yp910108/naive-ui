import { defineConfig } from 'vite'
import { createDemoPlugin } from './build/vite-plugin-demo'

export default defineConfig({
  plugins: createDemoPlugin(),
  optimizeDeps: {
    exclude: ['__INDEX__'],
  },
})
