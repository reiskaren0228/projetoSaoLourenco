import express, { Request, Response } from "express";
import TurmaController from "../controllers/turmaController";

const router = express.Router();

// Get all turmas
router.get("/", async (req: Request, res: Response) => {
  await TurmaController.getAllTurmas(req, res);
});

// Get turma by ID
router.get("/:id", async (req: Request, res: Response) => {
  await TurmaController.getTurmaById(req, res);
});

// Create new turma
router.post("/", async (req: Request, res: Response) => {
  await TurmaController.createTurma(req, res);
});

// Update turma by ID
router.put("/:id", async (req: Request, res: Response) => {
  await TurmaController.updateTurma(req, res);
});

// Delete turma by ID
router.delete("/:id", async (req: Request, res: Response) => {
  await TurmaController.deleteTurma(req, res);
});

export default router;
