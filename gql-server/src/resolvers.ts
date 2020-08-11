import { IResolvers } from 'apollo-server';
import pubsub from './pubsub';

const TASK_ADDED = 'TASK_ADDED';

interface Task {
  id: number;
  task: string;
  description: string;
}

const tasks: Task[] = [
  {
    id: 0,
    task: 'Выйти покурить',
    description: 'Интереснейшая задача',
  },
  {
    id: 1,
    task: 'Поплевать в потолок',
    description: 'Желательно прицельно',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves tasks from the "tasks" array above.
const resolvers: IResolvers = {
  Query: {
    allTasks: (): Task[] => tasks,
  },
  Mutation: {
    createTask: (_parent: unknown, { task, description }: { task: string; description: string }): Task => {
      const t: Task = { id: 2, task, description };
      tasks.push(t);
      pubsub.publish(TASK_ADDED, { taskAdded: t });
      return t;
    },
  },
  Subscription: {
    taskAdded: {
      subscribe: (): AsyncIterator<unknown> => pubsub.asyncIterator([TASK_ADDED]),
    },
  },
};

export default resolvers;
