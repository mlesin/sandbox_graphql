// import EventEmitterType, { EventEmitter, ListenerFn } from 'eventemitter3';
import { ExecutionResult, DocumentNode, OperationTypeNode, print } from 'graphql';
import { Observable } from '@apollo/client/utilities';
import { Operation } from '@apollo/client/core';
import * as Phoenix from 'phoenix';
import { Message, SubscriptionPayload } from './phoenix_message_types';

const getOperationType = (operation: DocumentNode): OperationTypeNode => {
  const opdef = operation.definitions.find(({ kind }) => kind === 'OperationDefinition');
  if (opdef?.kind === 'OperationDefinition') {
    return opdef.operation;
  }
  throw new TypeError(`Invalid operation:\n${operation}`);
};

export interface ClientOptions {
  /** Use to set lazy mode - connects only when first subscription created, and delay the socket initialization */
  lazy?: boolean;
}

interface SubscriptionHandler {
  onResult: (result: ExecutionResult) => void;
  unsubscribe: () => void;
}

export class SubscriptionClient {
  private phxSocket: Phoenix.Socket;
  private phxChannel: Phoenix.Channel;
  private phxJoined = false;
  public subscriptions: Record<string, SubscriptionHandler> = {};
  private lazy: boolean;

  constructor(phxSocket: Phoenix.Socket, options?: ClientOptions) {
    this.lazy = options?.lazy ?? false;

    this.phxSocket = phxSocket;
    this.phxChannel = this.phxSocket.channel('__absinthe__:control');

    if (!this.lazy) {
      this.connect();
    }
  }

  public request(request: Operation): Observable<ExecutionResult> {
    this.connect();

    return new Observable<ExecutionResult>((observer) => {
      let subscriptionId: string | undefined;
      const push = this.phxChannel.push('doc', { variables: request.variables, query: print(request.query) });
      push
        .receive('ok', (response) => {
          // console.log('got response:', response);
          if (getOperationType(request.query) === 'subscription') {
            // console.log('got subscription:', response.subscriptionId, this.subscriptions);
            subscriptionId = response.subscriptionId;
            this.subscriptions[response.subscriptionId] = {
              onResult: (result: ExecutionResult) => {
                // console.log('pushing result from sub:', result);
                observer.next(result);
              },
              unsubscribe: () => {
                console.log('completing subscription');
                observer.complete();
                this.phxChannel.push('unsubscribe', { subscriptionId });
              },
            };
          } else {
            observer.next(response);
            observer.complete();
          }
        })
        .receive('error', (errors) => {
          console.log('got errors:', errors);
          observer.error(errors[0]);
          observer.complete();
        })
        .receive('timeout', (timeout) => {
          console.log('got timeout:', timeout);
          observer.error(new Error('Request timed out'));
          observer.complete();
        });

      // unsubscription
      return () => {
        if (subscriptionId) {
          // console.log('unsubscribing subscription:', subscriptionId);
          this.subscriptions[subscriptionId].unsubscribe();
          delete this.subscriptions[subscriptionId];
          // console.log('subscriptions:', this.subscriptions);
        }
      };
    });
  }

  private connect() {
    if (this.phxJoined) return;
    this.phxSocket.connect();
    this.phxChannel.join();
    this.phxJoined = true;
    // console.log('connect initiated', this);
    this.phxSocket.onMessage((message: Message<SubscriptionPayload>) => {
      if (message.event === 'subscription:data') {
        // console.log('got sub event:', message);
        this.subscriptions[message.payload.subscriptionId].onResult(message.payload.result);
      }
    });
  }
}
