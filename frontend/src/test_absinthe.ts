import {Socket} from "phoenix";
import gql from "graphql-tag";
import {DocumentNode} from "graphql";
import {create, send, observe, GqlRequest} from "./absinthe/socket";

const absintheSocket = create(new Socket("ws://localhost:4000/socket"));
const operation: DocumentNode = gql`
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
const request: GqlRequest<any> = {
  operation,
  // variables: {userId: 10},
};
const notifier = send(absintheSocket, request);

console.log("###NOTIFIER:", notifier);

const logEvent = (eventName: string) => (...args: any[]) => console.log(eventName, ...args);

const updatedNotifier = observe(absintheSocket, notifier, {
  onAbort: logEvent("abort"),
  onError: logEvent("error"),
  onStart: logEvent("open"),
  onResult: logEvent("result"),
});

console.log("###NOTIFIER UPDATED:", updatedNotifier);

/*
An unknown error occurred during parsing:
 key :body not found in: 
 %{"definitions" => [
   %{"directives" => [],
    "kind" => "OperationDefinition",
    "name" => %{
      "kind" => "Name", 
      "value" => "allTasks"
    }, 
    "operation" => "query", 
    "selectionSet" => %{
      "kind" => "SelectionSet", 
      "selections" => [
        %{
          "arguments" => [], 
          "directives" => [], 
          "kind" => "Field", 
          "name" => %{
            "kind" => "Name", 
            "value" => "allTasks"
          }, 
          "selectionSet" => %{
            "kind" => "SelectionSet", 
            "selections" => [
              %{
                "arguments" => [], 
                "directives" => [], 
                "kind" => "Field",
                "name" => %{
                  "kind" => "Name", 
                  "value" => "id"
                }
              },
              %{
                "arguments" => [], 
                "directives" => [], 
                "kind" => "Field", 
                "name" => %{
                  "kind" => "Name", 
                  "value" => "task"
                }
              },
              %{
                "arguments" => [], 
                "directives" => [], 
                "kind" => "Field", 
                "name" => %{
                  "kind" => "Name", 
                  "value" => "description"
                }
              }
            ]
          }
        }]
      }, 
      "variableDefinitions" => []
    }
  ], 
  "kind" => "Document", 
    "loc" => %{
      "end" => 201, 
      "start" => 0
    }
  }
*/
