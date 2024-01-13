import { Pool } from "pg";

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "projetoSaoLourenco",
  password: "1234",
  port: 8080,
});

export default pool;
