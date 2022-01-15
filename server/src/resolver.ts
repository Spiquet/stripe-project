import * as bcrypt from 'bcryptjs'

import { User } from "./entity/User"
import { stripe} from "./stripe"

export const resolvers = {
    Query: {
        me: (_: any, __: any, { req }: any) => {
            if (!req.session.userId) {
                return null
            }
            return User.findOne(req.session.userId);
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
        },
        createSubscription: async (_: any, {source}: any, {req} : any) => {
            if (!req.session || !req.session.userId)
            {
                throw new Error("not authenticated");
            }

            const user = await User.findOne(req.session.userId);

            if(!user) {
                throw new Error();
            }

            const customer = await stripe.customers.create({
                email : user.email,
                source,
                plan: process.env.PLAN

            });

            user.stripeId = customer.id;
            user.type = "paid"
            await user.save();
            console.log(user);

            return user;

        }
    }
}