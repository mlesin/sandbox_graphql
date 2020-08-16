import VueRouter, { RouteConfig } from 'vue-router';

const Interactor = () => import('@/components/Interactor.vue');
const Incrementor = () => import('@/components/Incrementor.vue');

const routes: RouteConfig[] = [
  // { path: '/404', name: '404', component: NotFound },
  // { path: '*', redirect: '/404' },
  { path: '/', redirect: '/interactor' },
  {
    path: '/interactor',
    name: 'interactor',
    component: Interactor,
  },
  {
    path: '/incrementor',
    name: 'incrementor',
    component: Incrementor,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
