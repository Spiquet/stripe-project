import { createConnection } from "typeorm";

export const createTestConn = async (drop: boolean = false) =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "stripe-project-test",
    synchronize: drop,
    dropSchema: drop,
    logging: false,
    entities: ["src/entity/**/*"]
  });