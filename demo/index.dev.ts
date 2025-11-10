import { createApp } from 'vue'
import naive from '../src/index'
import createDemoRouter from './routes/router'
import { routes } from './routes/routes'
import SiteRoot from './SiteRoot.vue'

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)

app.use(naive)

router.isReady().then(() => {
  app.mount('#app')
})
