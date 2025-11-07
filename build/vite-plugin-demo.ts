import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { demoIndexTransFormPlugin } from './vite-plugin-index-tranform'

export function createDemoPlugin(): Plugin[] {
  return [demoIndexTransFormPlugin, vue()]
}
