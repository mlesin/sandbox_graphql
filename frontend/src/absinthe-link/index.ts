import { SubscriptionClient, ClientOptions } from './phoenix_transport';
import { ApolloLink, Operation, FetchResult } from '@apollo/client/core';
import { Observable } from '@apollo/client/utilities';
import { Socket } from 'phoenix';

/**
 * Configuration to use when constructing the subscription client (subscriptions-transport-ws).
 */
export interface Configuration {
  /**
   * The endpoint to connect to.
   */
  socket: Socket;

  /**
   * Options to pass when constructing the subscription client.
   */
  options?: ClientOptions;
}

export class PhoenixSocketLink extends ApolloLink {
  private subscriptionClient: SubscriptionClient;

  constructor(paramsOrClient: Configuration | SubscriptionClient) {
    super();

    if (paramsOrClient instanceof SubscriptionClient) {
      this.subscriptionClient = paramsOrClient;
    } else {
      this.subscriptionClient = new SubscriptionClient(paramsOrClient.socket, paramsOrClient.options);
    }
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return this.subscriptionClient.request(operation) as Observable<FetchResult>;
  }
}
