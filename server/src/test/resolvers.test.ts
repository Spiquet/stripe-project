import { Connection } from "typeorm";

import { gCall } from "../test.utils/grapqlTestCall";
import { createTestConn } from "../test.utils/createTestConnection";
import { User } from "../entity/User";
import { clear } from "console";

const registerMutation = `
    mutation RegisterMutation($email: String!, $password: String!) {
      register(email: $email, password: $password)
    }
  `;

const loginMutation = `
        mutation LoginMutation($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            id
            email
            type
            ccLast4
          }
        }
      `;

const meQuery = `
    query MeQuery {
      me {
        id
        email
        type
        ccLast4
      }
    }
  `;

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
  // TODO: Clear db 
});


describe("resolvers", () => {
  it("register, login, and me", async () => {
    const testUser = { email: 'bob@joe.com', password: 'bob' };

    const registerResponse = await gCall(registerMutation, {
      email: testUser.email,
      password: testUser.password
    });

    expect(registerResponse).toEqual({ data: { register: true } });

    const dbUser = await User.findOne({ where: { email: testUser.email } });

    expect(dbUser).toBeDefined();

    const loginResponse = await gCall(loginMutation, {
      email: testUser.email,
      password: testUser.password
    })

    console.log(loginResponse);
    


    expect(loginResponse).toMatchObject({
      data: {
        login: {
          id: `${dbUser!.id}`,
          email: dbUser!.email,
          type: dbUser!.type,
          ccLast4: dbUser!.ccLast4
        }
      }
    })

    const meResponse = await gCall(meQuery, {}, dbUser!.id)


    expect(meResponse).toMatchObject({
      data: {
        me: {
          id: `${dbUser!.id}`,
          email: dbUser!.email,
          type: dbUser!.type,
          ccLast4: dbUser!.ccLast4
        }
      }
    });

    const response = await gCall(meQuery);
    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  })
});
