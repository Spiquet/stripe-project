import { User } from "../entity/User";
import { createTestConn } from "../test.utils/createTestConnection";


describe('db test', () => {
    it('create user', async () => {
        const connection = await createTestConn();
        const user = new User();
        user.email = "timber@gmail.com"
        user.password = "connection db work"
        user.type = 'free-trial'

        await connection.manager.save(user)
    });
});