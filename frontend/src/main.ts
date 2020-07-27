import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import apolloClient from "./apollo_client";
import VueCompositionAPI from "@vue/composition-api";
import VueApollo from "vue-apollo";

Vue.use(VueCompositionAPI);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false;

/* const app = */ new Vue({
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount("#app");
