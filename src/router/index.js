/**
 * Created by admin on 2021/12/9.
 */
import ConstantRouterMap from "./routers";
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
const router = createRouter({
    // history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: ConstantRouterMap
})



router.beforeEach((to, from, next) => {
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = `${import.meta.env.VITE_APP_TITLE}`
    }
    next()
})

// 抛出路由实例, 在 main.js 中引用
export default router