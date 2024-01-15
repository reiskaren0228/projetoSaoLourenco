import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bancoSecSaoLourenco",
  synchronize: true,
  logging: true,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/**/*.ts"],
};

export = config;
