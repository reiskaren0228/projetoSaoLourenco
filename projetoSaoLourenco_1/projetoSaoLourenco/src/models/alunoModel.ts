import { Pool, QueryResult } from "pg";

class AlunoModel extends Pool {
  static pool = new Pool({
    connectionString: "postgres://postgres:root@localhost:5432/bancoSecSaoLourenco",
  });

  id: string;
  unidadeEscolar: string;
  regiaoEscola: string;
  serie: string;
  turma: string;
  nomeCompleto: string;
  estudanteComDeficiencia: boolean;
  deficiencia: string;
  cartaoRespostaPortuguesa: string;
  cartaoRespostaMatematica: string;

  constructor(data: any) {
    super();
    this.id = data.id || undefined;
    this.unidadeEscolar = data.unidadeEscolar || undefined;
    this.regiaoEscola = data.regiaoEscola || undefined;
    this.serie = data.serie || undefined;
    this.turma = data.turma || undefined;
    this.nomeCompleto = data.nomeCompleto || undefined;
    this.estudanteComDeficiencia = data.estudanteComDeficiencia || undefined;
    this.deficiencia = data.deficiencia || undefined;
    this.cartaoRespostaPortuguesa = data.cartaoRespostaPortuguesa || undefined;
    this.cartaoRespostaMatematica = data.cartaoRespostaMatematica || undefined;
  }

  static findById(id: string): Promise<AlunoModel | undefined> {
    return this.pool
      .query(
        `
        SELECT *
        FROM alunos
        WHERE id = $1
      `,
        [id]
      )
      .then((result) => result.rows[0] as AlunoModel)
      .then((data) => (data ? new AlunoModel(data) : undefined));
  }

  static findAll(): Promise<AlunoModel[]> {
    return this.pool
      .query(
        `
        SELECT *
        FROM alunos
      `
      )
      .then((result) =>
        result.rows.map((data) => new AlunoModel(data) as AlunoModel)
      );
  }

  static save(aluno: AlunoModel): Promise<AlunoModel> {
    return this.pool
      .query(
        `
        INSERT INTO alunos (
          id,
          unidadeEscolar,
          regiaoEscola,
          serie,
          turma,
          nomeCompleto,
          estudanteComDeficiencia,
          deficiencia,
          cartaoRespostaPortuguesa,
          cartaoRespostaMatematica
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
        [
          aluno.id,
          aluno.unidadeEscolar,
          aluno.regiaoEscola,
          aluno.serie,
          aluno.turma,
          aluno.nomeCompleto,
          aluno.estudanteComDeficiencia,
          aluno.deficiencia,
          aluno.cartaoRespostaPortuguesa,
          aluno.cartaoRespostaMatematica,
        ]
      )
      .then(() => aluno);
  }

  static update(aluno: AlunoModel): Promise<AlunoModel> {
    return this.pool
      .query(
        `
        UPDATE alunos
        SET
          unidadeEscolar = $1,
          regiaoEscola = $2,
          serie = $3,
          turma = $4,
          nomeCompleto = $5,
          estudanteComDeficiencia = $6,
          deficiencia = $7,
          cartaoRespostaPortuguesa = $8,
          cartaoRespostaMatematica = $9
        WHERE id = $10
      `,
        [
          aluno.unidadeEscolar,
          aluno.regiaoEscola,
          aluno.serie,
          aluno.turma,
          aluno.nomeCompleto,
          aluno.estudanteComDeficiencia,
          aluno.deficiencia,
          aluno.cartaoRespostaPortuguesa,
          aluno.cartaoRespostaMatematica,
          aluno.id,
        ]
      )
      .then(() => aluno);
  }

  static excluirPorId(id: string): Promise<void> {
    return this.pool
      .query("DELETE FROM alunos WHERE id = $1", [id])
      .then(() => undefined);
  }
}

export default AlunoModel;
