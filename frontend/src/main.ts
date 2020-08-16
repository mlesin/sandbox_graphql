import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import apolloClient from './apollo_client';
import VueCompositionAPI, { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import router from '@/router';

Vue.use(VueCompositionAPI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

/* const app = */ new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
