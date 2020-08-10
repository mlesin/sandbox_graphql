import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "@vue/composition-api";
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type ReactiveFunction<TParam> = () => TParam;
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

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  /** Subscribes for task additions */
  taskAdded?: Maybe<Task>;
};

export type Task = {
  __typename?: "Task";
  description: Scalars["String"];
  id: Scalars["ID"];
  task: Scalars["String"];
};

export type GetAllTasksQueryVariables = Exact<{[key: string]: never}>;

export type GetAllTasksQuery = {__typename?: "RootQueryType"} & {
  allTasks: Array<{__typename?: "Task"} & Pick<Task, "id" | "task" | "description">>;
};

export type CreateTaskMutationVariables = Exact<{
  task: Scalars["String"];
  description: Scalars["String"];
}>;

export type CreateTaskMutation = {__typename?: "RootMutationType"} & {
  createTask?: Maybe<{__typename?: "Task"} & Pick<Task, "id" | "task" | "description">>;
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

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a Vue component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllTasksQuery(
 *   {
 *   }
 * );
 */
export function useGetAllTasksQuery(
  options:
    | VueApolloComposable.UseQueryOptions<GetAllTasksQuery, GetAllTasksQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllTasksQuery, GetAllTasksQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllTasksQuery, GetAllTasksQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GetAllTasksQuery, undefined>(GetAllTasksDocument, undefined, options);
}
export type GetAllTasksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllTasksQuery, GetAllTasksQueryVariables>;
export const CreateTaskDocument = gql`
  mutation createTask($task: String!, $description: String!) {
    createTask(task: $task, description: $description) {
      id
      task
      description
    }
  }
`;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTaskMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>>
) {
  return VueApolloComposable.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
}
export type CreateTaskMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
