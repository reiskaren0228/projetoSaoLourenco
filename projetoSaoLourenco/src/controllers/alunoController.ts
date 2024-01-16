import { Request, Response } from "express";
import AlunoModel from "../models/alunoModel";

class AlunoController {
  static async getAlunoById(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;

    try {
      const aluno = await AlunoModel.findById(alunoId);

      if (aluno) {
        res.status(200).json(aluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllAlunos(req: Request, res: Response): Promise<void> {
    try {
      const alunos = await AlunoModel.findAll();
      res.status(200).json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createAluno(req: Request, res: Response): Promise<void> {
    const alunoData = req.body;

    try {
      const newAluno = new AlunoModel(alunoData);
      const savedAluno = await AlunoModel.save(newAluno);
      res.status(201).json(savedAluno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;
    const updatedAlunoData = req.body;

    try {
      const existingAluno = await AlunoModel.findById(alunoId);

      if (existingAluno) {
        const updatedAluno = new AlunoModel({
          ...existingAluno,
          ...updatedAlunoData,
        });

        await AlunoModel.update(updatedAluno);

        res.status(200).json(updatedAluno);
      } else {
        res.status(404).json({ message: "Aluno not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteAluno(req: Request, res: Response): Promise<void> {
    const alunoId = req.params.id;

    try {
      await AlunoModel.excluirPorId(alunoId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AlunoController;
