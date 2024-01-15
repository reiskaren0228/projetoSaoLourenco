"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios = require("axios");
var xlsx = require("xlsx");
var path = require("path");
var googleapis_1 = require("googleapis");
// Obter o diretório atual do script
var scriptDirectory = __dirname;
// Configurações da API do Google Sheets
var sheetsApi = googleapis_1.google.sheets("v4");
// URLs das planilhas no Google Sheets
var PEA_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1FZu_rbziDLAEbBOR8rbU_ae6tyIJYmqu/export?format=xlsx";
var GESTORES_ADJUNTOS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1BvwvlQLcS1nk57j6S8542ZxZSQ3ahwAr6czyg2VLxjk/export?format=xlsx";
var BASE_DE_DADOS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/18ugxh4_z4-Z2_kWt7g4LnRNzzqlN8dbn/export?format=xlsx";
// Função para converter uma planilha do Excel para JSON
function convertExcelToSheet(workbook, sheetName) {
  var sheet = workbook.Sheets[sheetName];
  var data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  return data;
}
// Função para converter uma planilha do Google Sheets para JSON
function convertGoogleSheetToJson(sheetUrl, sheetName, jsonFilePath) {
  return __awaiter(this, void 0, void 0, function () {
    var response, workbook, sheetData, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            axios.default.get(sheetUrl, { responseType: "arraybuffer" }),
          ];
        case 1:
          response = _a.sent();
          workbook = xlsx.read(response.data, { type: "buffer" });
          sheetData = convertExcelToSheet(workbook, sheetName);
          // Escrever o JSON resultante no arquivo
          fs.writeFileSync(jsonFilePath, JSON.stringify(sheetData, null, 2));
          console.log(
            "Convers\u00E3o de "
              .concat(sheetName, " para ")
              .concat(jsonFilePath, " conclu\u00EDda com sucesso!")
          );
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          console.error(
            "Erro ao processar a planilha ".concat(sheetName, ":"),
            error_1
          );
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Exemplos de uso
var sheets1 = ["Planilha_PEA_2023_CORRECAO"];
convertGoogleSheetToJson(
  PEA_SHEET_URL,
  sheets1[0],
  path.join(scriptDirectory, "pea_2023.json")
);
var sheets2 = ["Planilha_RelaçãoDosGestoresAdjuntosDaRede"];
convertGoogleSheetToJson(
  GESTORES_ADJUNTOS_SHEET_URL,
  sheets2[0],
  path.join(scriptDirectory, "relaçãoDosGestoresAdjuntosDaRede.json")
);
var sheets3 = ["Planilha_baseDeDados"];
convertGoogleSheetToJson(
  BASE_DE_DADOS_SHEET_URL,
  sheets3[0],
  path.join(scriptDirectory, "baseDeDados.json")
);
