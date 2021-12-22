import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import routes from "./routes"
export const router = createRouter({
    routes: routes,
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
});