import {Socket} from "phoenix";
import gql from "graphql-tag";
import * as withAbsintheSocket from "./absinthe/socket";

const absintheSocket = withAbsintheSocket.create(new Socket("ws://localhost:4000/socket"));
const operation = gql`
  # subscription userSubscription($userId: ID!) {
  #   user(userId: $userId) {
  #     id
  #     name
  #   }
  # }
  query allTasks {
    allTasks {
      id
      task
      description
    }
  }
`;
console.log(operation);

// This example uses a subscription, but the functionallity is the same for
// all operation types (queries, mutations and subscriptions)
const request: withAbsintheSocket.GqlRequest<{userId: number}> = {
  operation,
  variables: {userId: 10},
};
const notifier = withAbsintheSocket.send(absintheSocket, request);

console.log("###NOTIFIER:", notifier);

const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
  onAbort: (error: Error) => console.log("Abort observing:", error),
  onError: (error: Error) => console.log("Got error:", error),
  onStart: (notifier: withAbsintheSocket.Notifier) => console.log("Start observing:", notifier),
  onResult: (result: Record<string, unknown>) => {
    console.log("Got result:", result);
  },
});

console.log("###NOTIFIER UPDATED:", updatedNotifier, absintheSocket.channel);
// withAbsintheSocket.cancel(absintheSocket, updatedNotifier);
console.log("###AFTER CANCEL:", absintheSocket.channel);
