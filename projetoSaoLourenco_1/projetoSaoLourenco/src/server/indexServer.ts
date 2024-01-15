import express from "express";
import { createServer, Server } from "http";
import pgPromiseModule, { IDatabase } from "pg-promise";

// Configuração da conexão com o banco de dados
const connectionOptions = {
  host: "localhost",
  port: 5432,
  database: "bancoSecSaoLourenco",
  user: "postgres",
  password: "root",
};

// Inicialização do pg-promise
const pgp = pgPromiseModule();

// Criação da instância do banco de dados
const db: IDatabase<{}> = pgp(connectionOptions);

// Configuração do Express
const app: express.Express = express();
const httpServer: Server = createServer(app);

const PORT = process.env.PORT || 5432;

httpServer.listen(PORT, () => {
  console.log(`+++ O servidor está rodando na porta ${PORT} +++`);
  console.log(`+++ O servidor está acessível em https://localhost:${PORT} +++`);
});
