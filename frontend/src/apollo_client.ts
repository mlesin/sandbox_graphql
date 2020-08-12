import { ApolloClient, InMemoryCache } from '@apollo/client/core';
// import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
// import { PhxSocketLink } from '@/apollo-absinthe/link-phx';

const socketLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

// const socketLink = new PhxSocketLink({
//   uri: 'ws://localhost:4000/graphql',
//   options: {
//     reconnect: true,
//   },
// });

// HTTP connection to the API
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql',
// });

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   socketLink,
//   httpLink,
// );

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: socketLink,
  cache,
});

export default apolloClient;
