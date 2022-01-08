import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolver";



const startApolloServer = async () => {
    // Required logic for integrating with Expres
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })


    await createConnection();

    const app = express()

    await server.start();

    server.applyMiddleware({ app })

    await new Promise<void>(resolve => app.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();

