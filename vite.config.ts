import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createDemoPlugin } from './build/vite-plugin-demo'

export default defineConfig({
  plugins: createDemoPlugin(),
  optimizeDeps: {
    exclude: ['__INDEX__'],
  },
  server: {
    port: 1527,
  },
  resolve: {
    alias: {
      'naive-ui': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
