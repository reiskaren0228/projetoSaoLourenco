# Plataforma Pedagógica API

## Utilizando a API

A API é construída utilizando Node.js com o framework Express, e os dados são armazenados em um banco de dados relacional. O código é escrito em TypeScript, proporcionando uma experiência de desenvolvimento mais robusta.

### Obtenha suas chaves de API:

Suas solicitações de API são autenticadas usando chaves de API. Qualquer solicitação que não inclua uma chave de API retornará um erro.

Aqui estão as dependências que foram utilizadas no código:

**Tecnologias:**
- Express: Framework web para Node.js.
- pg: Cliente PostgreSQL para Node.js.
- ts-node: Executa arquivos TypeScript diretamente.
- typescript: Linguagem de programação que adiciona tipagem ao JavaScript.

**Dependências de Desenvolvimento:**
- @types/express: Tipagens para o Express.
- @types/node: Tipagens para o Node.js.
- nodemon: Monitora alterações nos arquivos e reinicia o servidor automaticamente.
- ts-node-dev: Ferramenta de desenvolvimento para TypeScript.

**Dependências do Banco de Dados (opcional, se estiver usando PostgreSQL):**
- pg-promise: Cliente PostgreSQL para Node.js com suporte a Promises.

**Outras Dependências Úteis (opcional):**
- cors: Middleware para habilitar o CORS (Cross-Origin Resource Sharing) no Express.
- helmet: Middleware para configurar headers HTTP de segurança no Express.
- dotenv: Carrega variáveis de ambiente a partir de um arquivo .env.

### Instalação:

```bash
# Install via NPM
npm install express pg ts-node typescript @types/express @types/node nodemon ts-node-dev pg-promise cors helmet dotenv
