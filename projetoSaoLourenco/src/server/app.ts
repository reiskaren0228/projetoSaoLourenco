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

// Routes
app.use("/api", escolaRouter, turmaRouter, alunoRouter, gestorRouter);

export default app;
