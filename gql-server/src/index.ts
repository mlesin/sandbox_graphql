import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './type_defs';
import resolvers from './resolvers';

const PORT = process.env.PORT || 4000;

const configureHttpServer = (httpServer: http.Server) => {
  console.info('Creating Express app');
  const expressApp = express();

  console.info('Creating Apollo server');
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer.applyMiddleware({ app: expressApp });

  console.info('Express app created with Apollo middleware');

  httpServer.on('request', expressApp);
  apolloServer.installSubscriptionHandlers(httpServer);
};

if (!process.httpServer) {
  console.info('Creating HTTP server');

  process.httpServer = http.createServer();

  configureHttpServer(process.httpServer);

  process.httpServer.listen(PORT, () => {
    console.info(`HTTP server ready at http://localhost:${PORT}/graphql`);
    console.info(`Websocket server ready at ws://localhost:${PORT}/graphql`);
  });
} else {
  console.info('Reloading HTTP server');
  process.httpServer.removeAllListeners('upgrade');
  process.httpServer.removeAllListeners('request');

  configureHttpServer(process.httpServer);

  console.info('HTTP server reloaded');
}

if (module.hot) {
  module.hot.accept();
}
