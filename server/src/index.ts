import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from 'apollo-server-express';

import * as express from 'express';
import * as session from 'express-session';

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolver";




const startApolloServer = async () => {
    // Required logic for integrating with Expres
    const app = express();
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }: any) => ({ req })
    });


    await createConnection();



    app.use(
        session({
            secret: 'kjfijqsuihjvsigiuqlJVODSQUHFVZ',
            name: 'server',
            resave: false,
            saveUninitialized: false,
            // store:
            cookie : {
                sameSite: 'none',
                secure: true
              }
        }),
    );

    await server.start();    

    server.applyMiddleware({
        app,
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });
      
    await new Promise<void>(resolve => app.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();

