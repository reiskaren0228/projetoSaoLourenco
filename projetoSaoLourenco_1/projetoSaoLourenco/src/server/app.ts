import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PoolClient } from "pg";
import dotenv from "dotenv";
import pool from "./database";
import { exampleMiddleware } from "./middleware";
import indexRouter from "../routes/indexRoutes";

dotenv.config();

const app = express();

interface ExtendedRequest extends Request {
  db?: PoolClient;
}

// Middlewares
app.use(
  cors({
    origin: process.env.FRONT_END_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados
app.use(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const client: PoolClient = await pool.connect();
    req.db = client;
    next();
  } catch (error) {
    console.error("*** Erro ao conectar ao banco de dados ***", error);
    res.status(500).json({ error: "*** Erro Interno no Servidor ***" });
  }
});

// Exemplo de middleware
app.use(exampleMiddleware);

// Rotas
app.use("/api", indexRouter);

// Liberação da conexão após a conclusão da solicitação
app.use((req: ExtendedRequest, res: Response, next: NextFunction) => {
  const db = req.db;
  if (db) {
    db.release();
  }
  next();
});

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .send("*** Erro Interno no Servidor! Por favor Verifique seu Servidor ***");
});

// Configuração do servidor
const PORT = process.env.PORT || 5432;

const server = app.listen(PORT, () => {
  console.log(`+++ O servidor está rodando na porta ${PORT} +++`);
  console.log(`+++ O servidor está acessível em https://localhost:${PORT} +++`);
});

export default server;
