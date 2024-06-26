import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueGridLayout from 'vue-grid-layout'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VueGridLayout)

app.mount('#app')
