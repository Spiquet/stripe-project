import "reflect-metadata";
import "dotenv/config"
import { createConnection } from "typeorm";
import { ApolloServer } from 'apollo-server-express';

import * as express from 'express';
import * as session from 'express-session';

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers";

const startApolloServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res })
  });

  app.use(
    session({
      secret: 'kjfijqsuihjvsigiuqlJVODSQUHFVZ',
      name: 'server',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7, // 7 days
        secure: false
      }
    }),
  );


  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });


  await createConnection();

  await new Promise<void>(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();

