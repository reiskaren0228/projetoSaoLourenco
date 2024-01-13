import express, { Request, Response } from "express";
import EscolaController from "../controllers/escolaController";

const router = express.Router();

// Get all escolas
router.get("/", async (req: Request, res: Response) => {
  await EscolaController.getAllEscolas(req, res);
});

// Get escola by ID
router.get("/:id", async (req: Request, res: Response) => {
  await EscolaController.getEscolaById(req, res);
});

// Create new escola
router.post("/", async (req: Request, res: Response) => {
  await EscolaController.createEscola(req, res);
});

// Update escola by ID
router.put("/:id", async (req: Request, res: Response) => {
  await EscolaController.updateEscola(req, res);
});

// Delete escola by ID
router.delete("/:id", async (req: Request, res: Response) => {
  await EscolaController.deleteEscola(req, res);
});

export default router;
