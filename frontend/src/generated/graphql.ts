import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /** Create a new task */
  createTask?: Maybe<Task>;
};

export type RootMutationTypeCreateTaskArgs = {
  description: Scalars["String"];
  task: Scalars["String"];
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** Get all tasks */
  allTasks: Array<Task>;
};

export type Task = {
  __typename?: "Task";
  description: Scalars["String"];
  id: Scalars["ID"];
  task: Scalars["String"];
};

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTasksQuery = { __typename?: "RootQueryType" } & {
  allTasks: Array<{ __typename?: "Task" } & Pick<Task, "id" | "task" | "description">>;
};

export const GetAllTasksDocument = gql`
  query getAllTasks {
    allTasks {
      id
      task
      description
    }
  }
`;
