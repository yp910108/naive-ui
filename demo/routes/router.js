import { createRouter, createWebHashHistory } from 'vue-router'

export default function createDemoRouter(app, routes) {
  return createRouter({
    history: createWebHashHistory(),
    routes,
  })
}
