import { Request, Response } from 'express';
import EscolaModel from '../models/escolaModel';

class EscolaController {
    static async getEscolaById(req: Request, res: Response): Promise<void> {
        const escolaId = req.params.id;

        try {
            const escola = await EscolaModel.findById(escolaId);

            if (escola) {
                res.status(200).json(escola);
            } else {
                res.status(404).json({ message: 'Escola not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllEscolas(req: Request, res: Response): Promise<void> {
        try {
            const escolas = await EscolaModel.findAll();
            res.status(200).json(escolas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async createEscola(req: Request, res: Response): Promise<void> {
        const escolaData = req.body;

        try {
            const novaEscola = new EscolaModel(escolaData);
            const escolaSalva = await EscolaModel.save(novaEscola);
            res.status(201).json(escolaSalva);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateEscola(req: Request, res: Response): Promise<void> {
        const escolaId = req.params.id;
        const dadosAtualizadosEscola = req.body;

        try {
            const escolaExistente = await EscolaModel.findById(escolaId);

            if (escolaExistente) {
                const escolaAtualizada = new EscolaModel({
                    ...escolaExistente,
                    ...dadosAtualizadosEscola,
                });

                await EscolaModel.update(escolaAtualizada);

                res.status(200).json(escolaAtualizada);
            } else {
                res.status(404).json({ message: 'Escola not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteEscola(req: Request, res: Response): Promise<void> {
        const escolaId = req.params.id;

        try {
            await EscolaModel.excluirPorId(escolaId);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default EscolaController;
