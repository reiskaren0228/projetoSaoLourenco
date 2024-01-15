import { Pool, QueryResult } from "pg";

class EscolaModel extends Pool {
  static pool = new Pool({
    connectionString: "postgres://postgres:root@localhost:5432/bancoSecSaoLourenco",
  });

  id: string;
  nome: string;
  gestor: string;
  quantidadeAlunos: number;
  series: string[];
  turmas: string[];
  regiao: string;
  possuiAlunoComDeficiencia: boolean;

  constructor(data: any) {
    super();
    this.id = data.id || undefined;
    this.nome = data.nome || undefined;
    this.gestor = data.gestor || undefined;
    this.quantidadeAlunos = data.quantidadeAlunos || 0;
    this.series = data.series || [];
    this.turmas = data.turmas || [];
    this.regiao = data.regiao || undefined;
    this.possuiAlunoComDeficiencia = data.possuiAlunoComDeficiencia || false;
  }

  static findById(id: string): Promise<EscolaModel | undefined> {
    return this.pool
      .query(
        `
            SELECT *
            FROM escolas
            WHERE id = $1
        `,
        [id]
      )
      .then((result) => result.rows[0] as EscolaModel)
      .then((data) => (data ? new EscolaModel(data) : undefined));
  }

  static findAll(): Promise<EscolaModel[]> {
    return this.pool
      .query(
        `
            SELECT *
            FROM escolas
        `
      )
      .then((result) =>
        result.rows.map((data) => new EscolaModel(data) as EscolaModel)
      );
  }

  static save(escola: EscolaModel): Promise<EscolaModel> {
    return this.pool
      .query(
        `
            INSERT INTO escolas (
                id,
                nome,
                gestor,
                quantidadeAlunos,
                series,
                turmas,
                regiao,
                possuiAlunoComDeficiencia
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          escola.id,
          escola.nome,
          escola.gestor,
          escola.quantidadeAlunos,
          escola.series,
          escola.turmas,
          escola.regiao,
          escola.possuiAlunoComDeficiencia,
        ]
      )
      .then(() => escola);
  }

  static update(escola: EscolaModel): Promise<EscolaModel> {
    return this.pool
      .query(
        `
            UPDATE escolas
            SET
                nome = $1,
                gestor = $2,
                quantidadeAlunos = $3,
                series = $4,
                turmas = $5,
                regiao = $6,
                possuiAlunoComDeficiencia = $7
            WHERE id = $8
        `,
        [
          escola.nome,
          escola.gestor,
          escola.quantidadeAlunos,
          escola.series,
          escola.turmas,
          escola.regiao,
          escola.possuiAlunoComDeficiencia,
          escola.id,
        ]
      )
      .then(() => escola);
  }

  static excluirPorId(id: string): Promise<void> {
    return this.pool
      .query("DELETE FROM escolas WHERE id = $1", [id])
      .then(() => undefined);
  }
}

export default EscolaModel;
