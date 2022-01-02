import "reflect-metadata";
// import { createConnection } from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolver";

// import { User } from "./entity/User";



// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

async function startApolloServer() {
    // Required logic for integrating with Expres
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    const app = express()
    
    await server.start();
    
    server.applyMiddleware({ app })
    
    await new Promise<void>(resolve => app.listen({ port: 4000 }, resolve));
    
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();

