import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import apolloClient from "./apollo_client";
import VueCompositionAPI, {provide} from "@vue/composition-api";
import {DefaultApolloClient} from "@vue/apollo-composable";
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

/* const app = */ new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  vuetify,
  render: h => h(App),
}).$mount("#app");
