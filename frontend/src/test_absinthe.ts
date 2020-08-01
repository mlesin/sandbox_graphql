import {Socket} from "phoenix";
import gql from "graphql-tag";
import * as withAbsintheSocket from "./absinthe/socket";

const absintheSocket = withAbsintheSocket.create(new Socket("ws://localhost:4000/socket"));

const getAllTasks = gql`
  query allTasks {
    allTasks {
      id
      task
      description
    }
  }
`;

const getAllNotifier = withAbsintheSocket.send(absintheSocket, {operation: getAllTasks});
// console.log("###NOTIFIER:", notifier);
withAbsintheSocket.observe(absintheSocket, getAllNotifier, {
  onAbort: (error: Error) => console.log("Q Abort observing:", error),
  onError: (error: Error) => console.log("Q Got error:", error),
  onStart: (notifier: withAbsintheSocket.Notifier) => console.log("Q Start observing:", notifier),
  onResult: (result: Record<string, unknown>) => {
    console.log("Q Got result:", result);
  },
});

const subscribeAllTasks = gql`
  subscription taskAdded {
    taskAdded {
      id
      task
      description
    }
  }
`;

const subscribeAllTasksNotifier = withAbsintheSocket.send(absintheSocket, {operation: subscribeAllTasks});
// console.log("###NOTIFIER:", notifier);
withAbsintheSocket.observe(absintheSocket, subscribeAllTasksNotifier, {
  onAbort: (error: Error) => console.log("S Abort observing:", error),
  onError: (error: Error) => console.log("S Got error:", error),
  onStart: (notifier: withAbsintheSocket.Notifier) => console.log("S Start observing:", notifier),
  onResult: (result: Record<string, unknown>) => {
    console.log("S Got result:", result);
  },
});

const createTask = gql`
  mutation createTask {
    createTask(task: "Some task", description: "Some description") {
      id
      task
      description
    }
  }
`;

const createTaskNotifier = withAbsintheSocket.send(absintheSocket, {operation: createTask});
// console.log("###NOTIFIER:", notifier);
withAbsintheSocket.observe(absintheSocket, createTaskNotifier, {
  onAbort: (error: Error) => console.log("M Abort observing:", error),
  onError: (error: Error) => console.log("M Got error:", error),
  onStart: (notifier: withAbsintheSocket.Notifier) => console.log("M Start observing:", notifier),
  onResult: (result: Record<string, unknown>) => {
    console.log("M Got result:", result);
  },
});
// console.log("###NOTIFIER UPDATED:", updatedNotifier);
// withAbsintheSocket.cancel(absintheSocket, updatedNotifier);
// console.log("###AFTER CANCEL:", absintheSocket.channel);
