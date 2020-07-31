import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";
// import VueApollo from "vue-apollo";
// import { createProvider } from "./vue-apollo";
import { Socket } from "phoenix";
import * as withAbsintheSocket from "@absinthe/socket";
import gql from "graphql-tag";

const absintheSocket = withAbsintheSocket.create(new Socket("ws://localhost:4000/socket"));
const operation = gql`
  subscription userSubscription($userId: ID!) {
    user(userId: $userId) {
      id
      name
    }
  }
`;

// This example uses a subscription, but the functionallity is the same for
// all operation types (queries, mutations and subscriptions)

const notifier = withAbsintheSocket.send(absintheSocket, {
  operation,
  variables: { userId: 10 }
});

console.log(absintheSocket);

Vue.use(VueCompositionAPI);
// Vue.use(VueApollo);

Vue.config.productionTip = false;

/* const app = */ new Vue({
  vuetify,
  // apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
