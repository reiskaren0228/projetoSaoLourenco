import * as fs from 'fs';
import * as axios from 'axios';
import * as xlsx from 'xlsx';
import * as path from 'path';
import { google, sheets_v4 } from 'googleapis';

// Obter o diretório atual do script
const scriptDirectory = __dirname;

// Configurações da API do Google Sheets
const sheetsApi = google.sheets('v4');

// URLs das planilhas no Google Sheets
const PEA_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1FZu_rbziDLAEbBOR8rbU_ae6tyIJYmqu/export?format=xlsx';
const GESTORES_ADJUNTOS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1BvwvlQLcS1nk57j6S8542ZxZSQ3ahwAr6czyg2VLxjk/export?format=xlsx';
const BASE_DE_DADOS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/18ugxh4_z4-Z2_kWt7g4LnRNzzqlN8dbn/export?format=xlsx';

// Função para converter uma planilha do Excel para JSON
function convertExcelToSheet(workbook: xlsx.WorkBook, sheetName: string) {
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return data;
}

// Função para converter uma planilha do Google Sheets para JSON
async function convertGoogleSheetToJson(sheetUrl: string, sheetName: string, jsonFilePath: string) {
    try {
        // Fazer solicitação HTTP para obter o conteúdo do arquivo Excel
        const response = await axios.default.get(sheetUrl, { responseType: 'arraybuffer' });

        // Usar a biblioteca xlsx para ler o conteúdo do arquivo Excel
        const workbook = xlsx.read(response.data, { type: 'buffer' });

        // Processar a planilha especificada
        const sheetData = convertExcelToSheet(workbook, sheetName);

        // Escrever o JSON resultante no arquivo
        fs.writeFileSync(jsonFilePath, JSON.stringify(sheetData, null, 2));

        console.log(`Conversão de ${sheetName} para ${jsonFilePath} concluída com sucesso!`);
    } catch (error) {
        console.error(`Erro ao processar a planilha ${sheetName}:`, error);
    }
}

// Exemplos de uso
const sheets1 = ['Planilha_PEA_2023_CORRECAO'];
convertGoogleSheetToJson(PEA_SHEET_URL, sheets1[0], path.join(scriptDirectory, 'pea_2023.json'));

const sheets2 = ['Planilha_RelaçãoDosGestoresAdjuntosDaRede'];
convertGoogleSheetToJson(GESTORES_ADJUNTOS_SHEET_URL, sheets2[0], path.join(scriptDirectory, 'relaçãoDosGestoresAdjuntosDaRede.json'));

const sheets3 = ['Planilha_baseDeDados'];
convertGoogleSheetToJson(BASE_DE_DADOS_SHEET_URL, sheets3[0], path.join(scriptDirectory, 'baseDeDados.json'));
