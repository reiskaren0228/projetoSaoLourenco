import { Pool, QueryResult } from "pg";

export class GestorModel extends Pool {
  static pool = new Pool({
    connectionString: "postgres://postgres:root@localhost:5432/bancoSecSaoLourenco",
  });

  id?: string;
  cpf?: string;
  nome?: string;
  escola?: string;
  funcao?: string;
  telefones?: string[];
  login?: string;

  constructor(data: any = {}) {
    super();
    this.id = data.id || undefined;
    this.cpf = data.cpf || undefined;
    this.nome = data.nome || undefined;
    this.escola = data.escola || undefined;
    this.funcao = data.funcao || undefined;
    this.telefones = data.telefones || [];
    this.login = data.login || undefined;
  }

  static findById(id: string): Promise<GestorModel | undefined> {
    return this.pool
      .query(
        `
            SELECT *
            FROM gestores
            WHERE id = $1
        `,
        [id]
      )
      .then((result) => result.rows[0] as GestorModel)
      .then((data) => (data ? new GestorModel(data) : undefined));
  }

  static findAll(): Promise<GestorModel[]> {
    return this.pool
      .query(
        `
            SELECT *
            FROM gestores
        `
      )
      .then((result) =>
        result.rows.map((data) => new GestorModel(data) as GestorModel)
      );
  }

  static save(gestor: GestorModel): Promise<GestorModel> {
    return this.pool
      .query(
        `
            INSERT INTO gestores (
                id,
                cpf,
                nome,
                escola,
                funcao,
                telefones,
                login
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          gestor.id,
          gestor.cpf,
          gestor.nome,
          gestor.escola,
          gestor.funcao,
          gestor.telefones,
          gestor.login,
        ]
      )
      .then(() => gestor);
  }

  static update(gestor: GestorModel): Promise<GestorModel> {
    return this.pool
      .query(
        `
            UPDATE gestores
            SET
                cpf = $1,
                nome = $2,
                escola = $3,
                funcao = $4,
                telefones = $5,
                login = $6
            WHERE id = $7
        `,
        [
          gestor.cpf,
          gestor.nome,
          gestor.escola,
          gestor.funcao,
          gestor.telefones,
          gestor.login,
          gestor.id,
        ]
      )
      .then(() => gestor);
  }

  static excluirPorId(id: string): Promise<void> {
    return this.pool
      .query("DELETE FROM gestores WHERE id = $1", [id])
      .then(() => undefined);
  }
}

export default GestorModel;
