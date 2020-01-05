import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/blogPage',
        name: 'blogPage',
        component: () => import(/* webpackChunkName: "blogPage" */ '../views/blogPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router