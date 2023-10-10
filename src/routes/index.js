import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Employers from "../components/Clients.vue";
import Employees from "../components/Employees.vue";
import NotFound from "../components/NotFound.vue";



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Employers },
        { path: '/client/:id', component: Employees },
        {path: '/:pathMatch(.*)*',component: NotFound}
    ]
})

export default router
