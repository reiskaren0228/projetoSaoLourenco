import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  escolaRouter,
  turmaRouter,
  alunoRouter,
  gestorRouter,
} from "../routes/indexRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = express.Router();

// Adicione as rotas ao roteador /api
apiRouter.use("/escolas", escolaRouter);
apiRouter.use("/turmas", turmaRouter);
apiRouter.use("/alunos", alunoRouter);
apiRouter.use("/gestores", gestorRouter);

// Use o roteador /api como middleware com o prefixo /api
app.use("/api", apiRouter);

export default app;
