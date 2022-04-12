import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            label: 'Home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            label: 'About',
            component: AboutView,
        },
    ],
})

export default router
