import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createDemoPlugin } from './build/vite-plugin-demo'

export default defineConfig({
  server: {
    port: 1527,
  },
  plugins: createDemoPlugin(),
  resolve: {
    alias: {
      'naive-ui': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
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
