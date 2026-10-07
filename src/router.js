import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {path: '/', redirect: '/plots'},
  {path: '/plots', name: 'plots', component: () => import('./plots/presentation/views/plot-list.vue')},
  {path: '/plots/new', name: 'plot-registration', component: () => import('./plots/presentation/views/plot-registration.vue')},
  {path: '/plots/:id', name: 'plot-details', component: () => import('./plots/presentation/views/plot-details.vue')}
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
