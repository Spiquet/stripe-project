import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "../typeDefs";
import { resolvers } from "../resolvers";
import { graphql } from "graphql";


// interface Options {
//   source: string;
//   variableValues?: any;
//   userId?: number | string;
// }

const schema = makeExecutableSchema({ typeDefs, resolvers });



export const gCall = async (source?: any, variableValues?: any, userId?: number | string) => {
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId
                }
            },
            res: {
                clearCookie: () => { }
            }
        }
    });
};

