import express from 'express';
import escolaRouter from './escolaRoutes';
import turmaRouter from './turmaRoutes';
import alunoRouter from './alunoRoutes';
import gestorRouter from './gestorRoutes';

const indexRouter = express.Router();

indexRouter.use('/escola', escolaRouter);
indexRouter.use('/turma', turmaRouter);
indexRouter.use('/aluno', alunoRouter);
indexRouter.use('/gestor', gestorRouter);

export default indexRouter;
