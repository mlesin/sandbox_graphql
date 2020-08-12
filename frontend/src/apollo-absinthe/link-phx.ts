import { SubscriptionClient, ClientOptions } from 'subscriptions-transport-ws';

import { ApolloLink, Operation, FetchResult } from '@apollo/client/core';
import { Observable } from '@apollo/client/utilities';

/**
 * Configuration to use when constructing the subscription client (subscriptions-transport-ws).
 */
export interface Configuration {
  /**
   * The endpoint to connect to.
   */
  uri: string;

  /**
   * Options to pass when constructing the subscription client.
   */
  options?: ClientOptions;

  /**
   * A custom WebSocket implementation to use.
   */
  webSocketImpl?: unknown;
}

// For backwards compatibility.
// export import WebSocketParams = WebSocketLink.Configuration;

export class PhxSocketLink extends ApolloLink {
  private subscriptionClient: SubscriptionClient;

  constructor(paramsOrClient: Configuration | SubscriptionClient) {
    super();

    if (paramsOrClient instanceof SubscriptionClient) {
      this.subscriptionClient = paramsOrClient;
    } else {
      this.subscriptionClient = new SubscriptionClient(paramsOrClient.uri, paramsOrClient.options, paramsOrClient.webSocketImpl);
    }
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return this.subscriptionClient.request(operation) as Observable<FetchResult>;
  }
}
