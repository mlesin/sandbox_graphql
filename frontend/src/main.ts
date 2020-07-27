import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";
import VueApollo from "vue-apollo";
import { createProvider } from "./vue-apollo";

Vue.use(VueCompositionAPI);
Vue.use(VueApollo);

Vue.config.productionTip = false;

/* const app = */ new Vue({
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
