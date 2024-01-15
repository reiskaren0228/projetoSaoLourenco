import * as fs from "fs";
import * as path from "path";
import pgPromiseModule = require("pg-promise");

const pgPromise = pgPromiseModule();

const connectionString =
  "postgres://postgres:root@localhost:5432/bancoSecSaoLourenco";
const db = pgPromise(connectionString);

// Diretório contendo seus arquivos JSON
const directoryPath = "src/utils/scripts";

// Lê todos os arquivos no diretório
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("*** Erro ao ler o diretório: ***", err);
    return;
  }

  // Itera sobre cada arquivo
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Lê o conteúdo do arquivo JSON
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Inserir dados na tabela
    const insertQueries = data.map((item: any) => {
      return db.none("INSERT INTO pessoas(nome) VALUES($1)", [item.nome]);
    });

    Promise.all(insertQueries)
      .then(() => {
        console.log(`Dados do arquivo ${file} inseridos com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao inserir dados do arquivo ${file}:`, error);
      });
  });

  // Fecha a conexão com o banco de dados após todos os arquivos serem processados
  db.$pool.end();
});
