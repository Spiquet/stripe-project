import * as bcrypt from 'bcryptjs'

import { User } from "./entity/User"

export const resolvers = {
    Query: {
        me: (_: any, __: any, { req }: any) => {
            if (!req.session.userId) {
                return null
            }
            return User.findOne(req.seesion.userId);
        }
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
        login: async (_: any, { email, password }: any, { req }: any) => {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return null;
            }

            const valid = await bcrypt.compare(password, user.password)
            if (!valid) {
                return null;
            }

            // Who why know that the user is who he is ?
            // We store a cookie on him and store the user Id on our server
            req.session.userId = user.id;
            
            return user;
        }
    }
}