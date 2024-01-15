const fs = require("fs");

const ormconfig = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bancoSecSaoLourenco",
  synchronize: true,
  logging: true,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src",
    migrationsDir: "src/migrations",
  },
};

fs.writeFileSync("ormconfig.json", JSON.stringify(ormconfig, null, 2));
