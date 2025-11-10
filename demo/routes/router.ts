import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export default function createDemoRouter(app: App, routes: RouteRecordRaw[]) {
  return createRouter({
    history: createWebHashHistory(),
    routes,
  })
}
