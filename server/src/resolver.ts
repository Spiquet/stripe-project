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
        },
        login: async (_: any, { email, password }: any) => {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            const valid = await bcrypt.compare(password, user.password)
            if (!valid) {
            }
            return user;
        }
    }
}