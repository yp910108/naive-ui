import type { Plugin } from 'vite'

export const demoIndexTransFormPlugin: Plugin = {
  name: 'demo-transform',
  transformIndexHtml: {
    order: 'pre',
    handler(code: string) {
      return code.replace(/__INDEX__/, 'demo/index.dev.js')
    },
  },
}
