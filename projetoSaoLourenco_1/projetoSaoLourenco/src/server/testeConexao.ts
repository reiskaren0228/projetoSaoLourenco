import { Pool } from "pg";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

async function testarConexao(): Promise<void> {
  try {
    // Teste básico de conexão
    const basicConnection = await pool.query("SELECT NOW()");
    console.log(
      "Teste básico de conexão bem-sucedido. Hora atual:",
      basicConnection.rows[0].now
    );

    // Teste para a tabela "avaliacao"
    // const avaliacaoResult = await pool.query("SELECT * FROM avaliacao");
    // console.log("Teste para a tabela 'avaliacao'. Resultado:", avaliacaoResult.rows);

    // Teste para a tabela "alunos"
    // const alunosResult = await pool.query("SELECT * FROM alunos");
    // console.log("Teste para a tabela 'alunos'. Resultado:", alunosResult.rows);

    // Teste para a tabela "escolas"
    // const escolasResult = await pool.query("SELECT * FROM escolas");
    // console.log("Teste para a tabela 'escolas'. Resultado:", escolasResult.rows);

    // Teste para a tabela "gestores"
    const gestoresResult = await pool.query("SELECT * FROM gestores");
    console.log("Teste para a tabela 'gestores'. Resultado:", gestoresResult.rows);

    // Teste para a tabela "pea"
    // const peaResult = await pool.query("SELECT * FROM pea");
    // console.log("Teste para a tabela 'pea'. Resultado:", peaResult.rows);

    const PORT = process.env.PORT || 5432;
    console.log("Todos os testes foram bem-sucedidos.");
    console.log(`+++ O servidor está rodando na porta ${PORT} +++`);
    console.log(
      `+++ O servidor está acessível em https://localhost:${PORT} +++`
    );
  } catch (error) {
    console.error("Erro ao testar a conexão:", error);
  } finally {
    // Libera o pool de conexões
    await pool.end();
  }
}

// Executa os testes de conexão
testarConexao();
