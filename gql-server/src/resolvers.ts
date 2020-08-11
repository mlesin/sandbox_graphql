import { IResolvers } from 'apollo-server';
import pubsub from './pubsub';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';

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

const getIds = (tasks: Task[]): number[] => A.array.map<Task, number>(tasks, (task) => task.id);
const findMaxId = (ids: number[]): number => A.array.reduce<number, number>(ids, 0, (prev: number, id: number) => (id > prev ? id : prev));

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves tasks from the "tasks" array above.
const resolvers: IResolvers = {
  Query: {
    allTasks: (): Task[] => tasks,
  },
  Mutation: {
    createTask: (_parent: unknown, { task, description }: { task: string; description: string }): Task => {
      if (task.length == 0 || description.length == 0) throw new Error('Task and Description fields should not be empty');
      const lastId: number = pipe(tasks, getIds, findMaxId);
      const t: Task = { id: lastId + 1, task, description };
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
