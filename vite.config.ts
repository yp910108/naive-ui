import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createDemoPlugin } from './build/vite-plugin-demo'

export default defineConfig({
  plugins: createDemoPlugin(),
  resolve: {
    alias: {
      'naive-ui': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 1527,
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['__INDEX__'],
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
