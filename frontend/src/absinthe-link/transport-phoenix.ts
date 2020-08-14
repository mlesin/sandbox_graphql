// import EventEmitterType, { EventEmitter, ListenerFn } from 'eventemitter3';
import { ExecutionResult } from 'graphql/execution/execute';
import { Observable, Observer } from '@apollo/client/utilities';
import { Operation } from '@apollo/client/core';
// import { print } from 'graphql/language/printer';
import { DocumentNode } from 'graphql/language/ast';
// import { getOperationAST } from 'graphql/utilities/getOperationAST';
// import $$observable from 'symbol-observable';
// import MessageTypes from './message-types';
import * as Phoenix from 'phoenix';

// Defaults
// const MIN_WS_TIMEOUT = 1000;
// const WS_TIMEOUT = 30000;
const ABSINTHE_CHANNEL_NAME = '__absinthe__:control';

// Helpers
// function isString(value?: unknown): value is string {
//   return typeof value === 'string';
// }

// function isObject(value?: unknown): boolean {
//   return value !== null && typeof value === 'object';
// }
/*
// TODO TO REMOVE
// export interface Observer<T> {
//   next?: (value: T) => void;
//   error?: (error: Error) => void;
//   complete?: () => void;
// }

// TODO TO REMOVE
// export interface Observable<T> {
//   subscribe(
//     observer: Observer<T>,
//   ): {
//     unsubscribe: () => void;
//   };
// }

// TODO TO REMOVE
// export interface Operation {
//   query?: string | DocumentNode;
//   variables?: Record<string, unknown>;
//   operationName?: string;
//   [key: string]: unknown;
// }
*/
export type FormatedError = Error & {
  originalError?: unknown;
};

export interface OperationHandler {
  options: Operation;
  handler: (error: Error[], result?: unknown) => void;
}

export interface Operations {
  [id: string]: OperationHandler;
}

export interface Middleware {
  applyMiddleware(options: Operation, next: Function): void;
}

export type ConnectionParams = {
  [paramName: string]: unknown;
};

export type ConnectionParamsOptions = ConnectionParams | Function | Promise<ConnectionParams>;

export interface ClientOptions {
  /** Object that will be available as first argument of onConnect (in server side),
   * if passed a function - it will call it and send the return value,
   * if function returns as promise - it will wait until it resolves and send the resolved value. */
  connectionParams?: ConnectionParamsOptions;
  /** The minimum amount of time the client should wait for a connection to be made (default 1000 ms) */
  minTimeout?: number;
  /** How long the client should wait in ms for a keep-alive message from the server (default 30000 ms),
   * this parameter is ignored if the server does not send keep-alive messages.
   * This will also be used to calculate the max connection time per connect/reconnect */
  timeout?: number;
  /** Automatic reconnect in case of connection error */
  reconnect?: boolean;
  /** How much reconnect attempts */
  reconnectionAttempts?: number;
  /** Optional, callback that called after the first init message, with the error (if there is one) */
  connectionCallback?: (error: Error[], result?: unknown) => void;
  /** Use to set lazy mode - connects only when first subscription created, and delay the socket initialization */
  lazy?: boolean;
  /** How long the client should wait in ms, when there are no active subscriptions,
   * before disconnecting from the server. Set to 0 to disable this behavior. (default 0) */
  inactivityTimeout?: number;
}

export class SubscriptionClient {
  private phxSocket: Phoenix.Socket;
  private phxChannel: Phoenix.Channel;
  // public operations: Operations;
  // private nextOperationId: number;
  // private connectionParams: Function;
  // private minWsTimeout: number;
  // private wsTimeout: number;
  // private unsentMessagesQueue: Array<unknown>; // queued messages while websocket is opening.
  // private reconnect: boolean;
  // private reconnecting: boolean;
  // private reconnectionAttempts: number;
  // private backoff: unknown;
  private connectionCallback: unknown;
  // private eventEmitter: EventEmitterType;
  private lazy: boolean;
  // private inactivityTimeout: number;
  // private inactivityTimeoutId: unknown;
  // private closedByUser: boolean;
  // private wasKeepAliveReceived: boolean;
  // private tryReconnectTimeoutId: unknown;
  // private checkConnectionIntervalId: unknown;
  // private maxConnectTimeoutId: unknown;
  // private middlewares: Middleware[];
  // private maxConnectTimeGenerator: unknown;

  constructor(phxSocket: Phoenix.Socket, options?: ClientOptions) {
    // const {
    //   connectionCallback = undefined,
    //   connectionParams = {},
    //   minTimeout = MIN_WS_TIMEOUT,
    //   timeout = WS_TIMEOUT,
    //   reconnect = false,
    //   reconnectionAttempts = Infinity,
    //   inactivityTimeout = 0,
    // } = options || {};

    // this.connectionCallback = connectionCallback;
    // this.url = url;
    // this.operations = {};
    // this.nextOperationId = 0;
    // this.minWsTimeout = minTimeout;
    // this.wsTimeout = timeout;
    // this.unsentMessagesQueue = [];
    // this.reconnect = reconnect;
    // this.reconnecting = false;
    // this.reconnectionAttempts = reconnectionAttempts;
    this.lazy = options?.lazy ?? false;
    // this.inactivityTimeout = inactivityTimeout;
    // this.closedByUser = false;
    // this.backoff = new Backoff({ jitter: 0.5 });
    // this.eventEmitter = new EventEmitter();
    // this.middlewares = [];
    // this.client = null;
    // this.maxConnectTimeGenerator = this.createMaxConnectTimeGenerator();
    // this.connectionParams = this.getConnectionParams(connectionParams);

    this.phxSocket = phxSocket;
    this.phxChannel = this.phxSocket.channel(ABSINTHE_CHANNEL_NAME);

    if (!this.lazy) {
      this.connect();
    }
  }

  // public get status() {
  //   if (this.client === null) {
  //     return this.wsImpl.CLOSED;
  //   }

  //   return this.client.readyState;
  // }

  // public close(isForced = true, closedByUser = true) {
  //   this.clearInactivityTimeout();
  //   if (this.client !== null) {
  //     this.closedByUser = closedByUser;

  //     if (isForced) {
  //       this.clearCheckConnectionInterval();
  //       this.clearMaxConnectTimeout();
  //       this.clearTryReconnectTimeout();
  //       this.unsubscribeAll();
  //       this.sendMessage(undefined, MessageTypes.GQL_CONNECTION_TERMINATE, null);
  //     }

  //     this.client.close();
  //     this.client.onopen = null;
  //     this.client.onclose = null;
  //     this.client.onerror = null;
  //     this.client.onmessage = null;
  //     this.client = null;
  //     this.eventEmitter.emit('disconnected');

  //     if (!isForced) {
  //       this.tryReconnect();
  //     }
  //   }
  // }

  public request(request: Operation): Observable<ExecutionResult> {
    const getObserver = this.getObserver.bind(this);
    const executeOperation = this.executeOperation.bind(this);
    // const unsubscribe = this.unsubscribe.bind(this);
    // let opId: string;
    // this.clearInactivityTimeout();
    // return {
    //   [$$observable]() {
    //     return this;
    //   },
    //   subscribe(
    //     observerOrNext: Observer<ExecutionResult> | ((v: ExecutionResult) => void),
    //     onError?: (error: Error) => void,
    //     onComplete?: () => void,
    //   ) {
    //     const observer = getObserver(observerOrNext, onError, onComplete);
    //     opId = executeOperation(request, (error: Error[], result: any) => {
    //       if (error === null && result === null) {
    //         if (observer.complete) {
    //           observer.complete();
    //         }
    //       } else if (error) {
    //         if (observer.error) {
    //           observer.error(error[0]);
    //         }
    //       } else {
    //         if (observer.next) {
    //           observer.next(result);
    //         }
    //       }
    //     });
    //     return {
    //       unsubscribe: () => {
    //         if (opId) {
    //           unsubscribe(opId);
    //           opId = null;
    //         }
    //       },
    //     };
    //   },
    // };
  }

  // public on(eventName: string, callback: ListenerFn, context?: any): Function {
  //   const handler = this.eventEmitter.on(eventName, callback, context);

  //   return () => {
  //     handler.off(eventName, callback, context);
  //   };
  // }

  // public onConnected(callback: ListenerFn, context?: any): Function {
  //   return this.on('connected', callback, context);
  // }

  // public onConnecting(callback: ListenerFn, context?: any): Function {
  //   return this.on('connecting', callback, context);
  // }

  // public onDisconnected(callback: ListenerFn, context?: any): Function {
  //   return this.on('disconnected', callback, context);
  // }

  // public onReconnected(callback: ListenerFn, context?: any): Function {
  //   return this.on('reconnected', callback, context);
  // }

  // public onReconnecting(callback: ListenerFn, context?: any): Function {
  //   return this.on('reconnecting', callback, context);
  // }

  // public onError(callback: ListenerFn, context?: any): Function {
  //   return this.on('error', callback, context);
  // }

  // public unsubscribeAll() {
  //   Object.keys(this.operations).forEach((subId) => {
  //     this.unsubscribe(subId);
  //   });
  // }

  // public applyMiddlewares(options: Operation): Promise<Operation> {
  //   return new Promise((resolve, reject) => {
  //     const queue = (funcs: Middleware[], scope: any) => {
  //       const next = (error?: any) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           if (funcs.length > 0) {
  //             const f = funcs.shift();
  //             if (f) {
  //               f.applyMiddleware.apply(scope, [options, next]);
  //             }
  //           } else {
  //             resolve(options);
  //           }
  //         }
  //       };
  //       next();
  //     };

  //     queue([...this.middlewares], this);
  //   });
  // }

  // public use(middlewares: Middleware[]): SubscriptionClient {
  //   middlewares.map((middleware) => {
  //     if (typeof middleware.applyMiddleware === 'function') {
  //       this.middlewares.push(middleware);
  //     } else {
  //       throw new Error('Middleware must implement the applyMiddleware function.');
  //     }
  //   });

  //   return this;
  // }

  // private getConnectionParams(connectionParams: ConnectionParamsOptions): Function {
  //   return (): Promise<ConnectionParams> =>
  //     new Promise((resolve, reject) => {
  //       if (typeof connectionParams === 'function') {
  //         try {
  //           return resolve(connectionParams.call(null));
  //         } catch (error) {
  //           return reject(error);
  //         }
  //       }

  //       resolve(connectionParams);
  //     });
  // }

  private executeOperation(options: Operation, handler: (error: Error[], result?: any) => void): string {
    if (this.phxSocket.connectionState === null) {
      this.connect();
    }

    const opId = this.generateOperationId();
    this.operations[opId] = { options: options, handler };

    this.applyMiddlewares(options)
      .then((processedOptions) => {
        this.checkOperationOptions(processedOptions, handler);
        if (this.operations[opId]) {
          this.operations[opId] = { options: processedOptions, handler };
          this.sendMessage(opId, MessageTypes.GQL_START, processedOptions);
        }
      })
      .catch((error) => {
        this.unsubscribe(opId);
        handler(this.formatErrors(error));
      });

    return opId;
  }

  private getObserver<T>(observerOrNext: Observer<T> | ((v: T) => void), error?: (e: Error) => void, complete?: () => void) {
    if (typeof observerOrNext === 'function') {
      return {
        next: (v: T) => observerOrNext(v),
        error: (e: Error) => error && error(e),
        complete: () => complete && complete(),
      };
    }

  //   return observerOrNext;
  // }

  // private checkOperationOptions(options: Operation, handler: (error: Error[], result?: any) => void) {
  //   const { query, variables, operationName } = options;

  //   if (!query) {
  //     throw new Error('Must provide a query.');
  //   }

  //   if (!handler) {
  //     throw new Error('Must provide an handler.');
  //   }

  //   if (
  //     (!isString(query) && !getOperationAST(query, operationName)) ||
  //     (operationName && !isString(operationName)) ||
  //     (variables && !isObject(variables))
  //   ) {
  //     throw new Error(
  //       'Incorrect option types. query must be a string or a document,' +
  //         '`operationName` must be a string, and `variables` must be an object.',
  //     );
  //   }
  // }

  // private buildMessage(id: string, type: string, payload: any) {
  //   const payloadToReturn =
  //     payload && payload.query
  //       ? {
  //           ...payload,
  //           query: typeof payload.query === 'string' ? payload.query : print(payload.query),
  //         }
  //       : payload;

  //   return {
  //     id,
  //     type,
  //     payload: payloadToReturn,
  //   };
  // }

  // // ensure we have an array of errors
  // private formatErrors(errors: any): FormatedError[] {
  //   if (Array.isArray(errors)) {
  //     return errors;
  //   }

  //   // TODO  we should not pass ValidationError to callback in the future.
  //   // ValidationError
  //   if (errors && errors.errors) {
  //     return this.formatErrors(errors.errors);
  //   }

  //   if (errors && errors.message) {
  //     return [errors];
  //   }

  //   return [
  //     {
  //       name: 'FormatedError',
  //       message: 'Unknown error',
  //       originalError: errors,
  //     },
  //   ];
  // }

  // private sendMessage(id: string, type: string, payload: any) {
  //   this.sendMessageRaw(this.buildMessage(id, type, payload));
  // }

  // // send message, or queue it if connection is not open
  // private sendMessageRaw(message: Record<string, any>) {
  //   switch (this.status) {
  //     case this.wsImpl.OPEN:
  //       const serializedMessage: string = JSON.stringify(message);
  //       try {
  //         JSON.parse(serializedMessage);
  //       } catch (e) {
  //         this.eventEmitter.emit('error', new Error(`Message must be JSON-serializable. Got: ${message}`));
  //       }

  //       this.client.send(serializedMessage);
  //       break;
  //     case this.wsImpl.CONNECTING:
  //       this.unsentMessagesQueue.push(message);

  //       break;
  //     default:
  //       if (!this.reconnecting) {
  //         this.eventEmitter.emit(
  //           'error',
  //           new Error(
  //             `${'A message was not sent because socket is not connected, is closing or ' +
  //               'is already closed. Message was: '}${JSON.stringify(message)}`,
  //           ),
  //         );
  //       }
  //   }
  // }

  // private generateOperationId(): string {
  //   return String(++this.nextOperationId);
  // }

  // private tryReconnect() {
  //   if (!this.reconnect || this.backoff.attempts >= this.reconnectionAttempts) {
  //     return;
  //   }

  //   if (!this.reconnecting) {
  //     Object.keys(this.operations).forEach((key) => {
  //       this.unsentMessagesQueue.push(this.buildMessage(key, MessageTypes.GQL_START, this.operations[key].options));
  //     });
  //     this.reconnecting = true;
  //   }

  //   this.clearTryReconnectTimeout();

  //   const delay = this.backoff.duration();
  //   this.tryReconnectTimeoutId = setTimeout(() => {
  //     this.connect();
  //   }, delay);
  // }

  // private flushUnsentMessagesQueue() {
  //   this.unsentMessagesQueue.forEach((message) => {
  //     this.sendMessageRaw(message);
  //   });
  //   this.unsentMessagesQueue = [];
  // }

  // private checkConnection() {
  //   if (this.wasKeepAliveReceived) {
  //     this.wasKeepAliveReceived = false;
  //     return;
  //   }

  //   if (!this.reconnecting) {
  //     this.close(false, true);
  //   }
  // }

  private connect() {
    console.log('connect called', this);
    // TODO check if already connected and joined - skip this step
    if(this.phxSocket.isConnected() && this.phxChannel.)
    this.phxSocket.connect();
    this.phxChannel.join();
    //   .receive('ok', onSucceedHandler)
    //   .receive('error', onErrorHandler)
    //   .receive('timeout', onTimeoutHandler);

    //   this.client.onopen = async () => {
    //     if (this.status === this.wsImpl.OPEN) {
    //       this.closedByUser = false;
    //       this.eventEmitter.emit(this.reconnecting ? 'reconnecting' : 'connecting');
    //       try {
    //         const connectionParams: ConnectionParams = await this.connectionParams();
    //         // Send CONNECTION_INIT message, no need to wait for connection to success (reduce roundtrips)
    //         this.sendMessage(undefined, MessageTypes.GQL_CONNECTION_INIT, connectionParams);
    //         this.flushUnsentMessagesQueue();
    //       } catch (error) {
    //         this.sendMessage(undefined, MessageTypes.GQL_CONNECTION_ERROR, error);
    //         this.flushUnsentMessagesQueue();
    //       }
    //     }
    //   };
    //   this.client.onclose = () => {
    //     if (!this.closedByUser) {
    //       this.close(false, false);
    //     }
    //   };
    //   this.client.onerror = (err: Error) => {
    //     // Capture and ignore errors to prevent unhandled exceptions, wait for
    //     // onclose to fire before attempting a reconnect.
    //     this.eventEmitter.emit('error', err);
    //   };
    //   this.client.onmessage = ({ data }: { data: any }) => {
    //     this.processReceivedData(data);
    //   };
  }

  // private processReceivedData(receivedData: any) {
  //   let parsedMessage: any;
  //   let opId: string;

  //   try {
  //     parsedMessage = JSON.parse(receivedData);
  //     opId = parsedMessage.id;
  //   } catch (e) {
  //     throw new Error(`Message must be JSON-parseable. Got: ${receivedData}`);
  //   }

  //   if (
  //     [MessageTypes.GQL_DATA, MessageTypes.GQL_COMPLETE, MessageTypes.GQL_ERROR].indexOf(parsedMessage.type) !== -1 &&
  //     !this.operations[opId]
  //   ) {
  //     this.unsubscribe(opId);

  //     return;
  //   }

  //   switch (parsedMessage.type) {
  //     case MessageTypes.GQL_CONNECTION_ERROR:
  //       if (this.connectionCallback) {
  //         this.connectionCallback(parsedMessage.payload);
  //       }
  //       break;

  //     case MessageTypes.GQL_CONNECTION_ACK:
  //       this.eventEmitter.emit(this.reconnecting ? 'reconnected' : 'connected', parsedMessage.payload);
  //       this.reconnecting = false;
  //       this.backoff.reset();
  //       this.maxConnectTimeGenerator.reset();

  //       if (this.connectionCallback) {
  //         this.connectionCallback();
  //       }
  //       break;

  //     case MessageTypes.GQL_COMPLETE:
  //       const handler = this.operations[opId].handler;
  //       delete this.operations[opId];
  //       handler.call(this, null, null);
  //       break;

  //     case MessageTypes.GQL_ERROR:
  //       this.operations[opId].handler(this.formatErrors(parsedMessage.payload), null);
  //       delete this.operations[opId];
  //       break;

  //     case MessageTypes.GQL_DATA:
  //       const parsedPayload = !parsedMessage.payload.errors
  //         ? parsedMessage.payload
  //         : { ...parsedMessage.payload, errors: this.formatErrors(parsedMessage.payload.errors) };
  //       this.operations[opId].handler(null, parsedPayload);
  //       break;

  //     case MessageTypes.GQL_CONNECTION_KEEP_ALIVE:
  //       const firstKA = typeof this.wasKeepAliveReceived === 'undefined';
  //       this.wasKeepAliveReceived = true;

  //       if (firstKA) {
  //         this.checkConnection();
  //       }

  //       if (this.checkConnectionIntervalId) {
  //         clearInterval(this.checkConnectionIntervalId);
  //         this.checkConnection();
  //       }
  //       this.checkConnectionIntervalId = setInterval(this.checkConnection.bind(this), this.wsTimeout);
  //       break;

  //     default:
  //       throw new Error('Invalid message type!');
  //   }
  // }

  // private unsubscribe(opId: string) {
  //   if (this.operations[opId]) {
  //     delete this.operations[opId];
  //     this.setInactivityTimeout();
  //     this.sendMessage(opId, MessageTypes.GQL_STOP, undefined);
  //   }
  // }
}
