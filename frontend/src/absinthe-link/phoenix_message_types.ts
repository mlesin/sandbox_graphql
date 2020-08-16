import { GraphQLError, ExecutionResult } from 'graphql';

export interface Message<Payload> {
  topic: string;
  event: string;
  payload: Payload;
  ref: null | number;
  join_ref: null | number;
}

export interface GqlResponse {
  data?: ExecutionResult;
  errors?: readonly GraphQLError[];
}

export interface SubscriptionPayload {
  result: GqlResponse;
  subscriptionId: string;
}
