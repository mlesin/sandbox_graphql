import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client/core';
// import { WebSocketLink } from '@apollo/client/link/ws';
import createAbsintheSocketLink from '@absinthe/socket-apollo-link';
import { create } from '@absinthe/socket';
import { Socket } from 'phoenix';
import { getMainDefinition } from '@apollo/client/utilities';

// const socketLink = new WebSocketLink({
//   uri: 'ws://localhost:4000/graphql',
//   options: {
//     reconnect: true,
//   },
// });

const absintheSocket = create(new Socket('ws://localhost:4000/socket'));
const socketLink = createAbsintheSocketLink(absintheSocket);

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  socketLink,
  httpLink,
);
// just to temporarily silence eslint warning
console.log(splitLink);

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: socketLink,
  cache,
});

export default apolloClient;
