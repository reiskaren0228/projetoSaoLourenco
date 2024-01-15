import { Pool, QueryResult } from "pg";

export class TurmaModel extends Pool {
  static pool = new Pool({
    connectionString: "postgres://postgres:root@localhost:5432/bancoSecSaoLourenco",
  });

  id: string;
  escola: string;
  serie: string;
  ano: number;
  nome: string;
  turno: string;
  quantidadeAlunos: number;

  constructor(data: any = {}) {
    super();
    this.id = data.id || undefined;
    this.escola = data.escola || undefined;
    this.serie = data.serie || undefined;
    this.ano = data.ano || undefined;
    this.nome = data.nome || undefined;
    this.turno = data.turno || undefined;
    this.quantidadeAlunos = data.quantidadeAlunos || 0;
  }

  static findById(id: string): Promise<TurmaModel | undefined> {
    return this.pool
      .query(
        `
            SELECT *
            FROM turmas
            WHERE id = $1
        `,
        [id]
      )
      .then((result) => result.rows[0] as TurmaModel)
      .then((data) => (data ? new TurmaModel(data) : undefined));
  }

  static findAll(): Promise<TurmaModel[]> {
    return this.pool
      .query(
        `
            SELECT *
            FROM turmas
        `
      )
      .then((result) =>
        result.rows.map((data) => new TurmaModel(data) as TurmaModel)
      );
  }

  static save(turma: TurmaModel): Promise<TurmaModel> {
    return this.pool
      .query(
        `
            INSERT INTO turmas (
                id,
                escola,
                serie,
                ano,
                nome,
                turno,
                quantidadeAlunos
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          turma.id,
          turma.escola,
          turma.serie,
          turma.ano,
          turma.nome,
          turma.turno,
          turma.quantidadeAlunos,
        ]
      )
      .then(() => turma);
  }

  static update(turma: TurmaModel): Promise<TurmaModel> {
    return this.pool
      .query(
        `
            UPDATE turmas
            SET
                escola = $1,
                serie = $2,
                ano = $3,
                nome = $4,
                turno = $5,
                quantidadeAlunos = $6
            WHERE id = $7
        `,
        [
          turma.escola,
          turma.serie,
          turma.ano,
          turma.nome,
          turma.turno,
          turma.quantidadeAlunos,
          turma.id,
        ]
      )
      .then(() => turma);
  }

  static excluirPorId(id: string): Promise<void> {
    return this.pool
      .query("DELETE FROM turmas WHERE id = $1", [id])
      .then(() => undefined);
  }
}

export default TurmaModel;
