export interface Message<Payload> {
  topic: string;
  event: string;
  payload: Payload;
  ref: null | number;
  join_ref: null | number;
}

export interface GqlErrorLocation {
  line: number;
  column: number;
}

export interface GqlError {
  message: string;
  locations?: Array<GqlErrorLocation>;
}

export interface GqlResponse {
  data?: unknown;
  errors?: Array<GqlError>;
}

export interface SubscriptionPayload {
  result: GqlResponse;
  subscriptionId: string;
}
