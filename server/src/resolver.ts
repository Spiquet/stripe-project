import * as bcrypt from 'bcryptjs'

import { User } from "./entity/User"

export const resolvers = {
    Query: {
        hello: () => "Hi"
    },

    Mutation: {
        register: async (_: any, { email, password }: any) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword
            }).save();

            return true;
        }
    }
}