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


  let retries = 5;
  while (retries) {
    try {
      await createConnection();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }

    await server.start();


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



    server.applyMiddleware({
      app,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });

    await new Promise<void>(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }
}

startApolloServer();

