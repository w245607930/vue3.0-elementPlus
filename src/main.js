import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '~/css/main.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    NProgress.start();
    next()
})

router.afterEach(() => {
    console.log('afterEach')
    NProgress.done()
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')