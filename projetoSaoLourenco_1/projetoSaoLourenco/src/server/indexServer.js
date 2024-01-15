"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var pgPromiseModule = require("pg-promise");
var pgPromise = pgPromiseModule();
// Configuração da conexão com o banco de dados
var connectionOptions = {
    host: "localhost",
    port: 5432,
    database: "bancoSecSaoLourenco",
    user: "projetoSaoLourenco",
    password: "root",
};
// Inicialização do pg-promise
var pgp = pgPromise(connectionOptions);
// Verificar a conexão ao banco de dados
var db;
pgp
    .connect()
    .then(function (obj) {
    console.log("Conexão bem-sucedida.");
    // Obtendo o objeto db para interagir com o banco de dados
    db = obj;
    // Executar consulta de teste
    return obj.any("SELECT 1 + 1 AS result");
})
    .then(function (result) {
    console.log("Resultado da consulta:", result.result);
})
    .catch(function (error) {
    console.error("Erro ao conectar ou executar consulta:", error);
})
    .finally(function () {
    // Encerrar a conexão
    if (db) {
        db.done(); // Usar done() para liberar a conexão de volta para o pool
    }
});
// Configuração do Express
var app = express();
// Defina outras configurações do Express, rotas, middleware, etc.
var httpServer;
httpServer = (0, http_1.createServer)(app);
var PORT = process.env.PORT || 8080;
httpServer.listen(PORT, function () {
    console.log("+++ O servidor est\u00E1 rodando na porta ".concat(PORT, " +++"));
    console.log("+++ O servidor est\u00E1 acess\u00EDvel em https://localhost:".concat(PORT, " +++"));
});
