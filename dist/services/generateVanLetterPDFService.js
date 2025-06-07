"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartaById = getCartaById;
exports.generatePDF = generatePDF;
exports.getTemplatePaths = getTemplatePaths;
const prisma_1 = require("../lib/prisma");
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
/**
 * Serviço para buscar uma carta pelo ID.
 *
 * Este serviço consulta o banco de dados para obter os dados de uma carta específica,
 * incluindo informações do banco, tipo CNAB e serviço associado.
 *
 * @param cartaId - ID da carta a ser buscada.
 * @returns Retorna os dados da carta, incluindo informações relacionadas, ou `null` se não encontrada.
 */
async function getCartaById(cartaId) {
    return await prisma_1.prisma.cartaVan.findUnique({
        where: { id: cartaId },
        include: {
            banco: true,
            tipoCnab: true,
            servico: true,
        },
    });
}
/**
 * Serviço para gerar um PDF a partir de um conteúdo HTML.
 *
 * Este serviço utiliza o Puppeteer para renderizar o HTML e gerar um PDF.
 *
 * @param html - Conteúdo HTML que será renderizado no PDF.
 * @returns Retorna um buffer contendo o PDF gerado.
 * @throws Lança um erro caso ocorra algum problema durante a geração do PDF.
 */
async function generatePDF(html) {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
        scale: 0.8,
    });
    await browser.close();
    return Buffer.from(pdfBuffer);
}
/**
 * Serviço para obter os caminhos do template HTML e do CSS com base no nome do serviço.
 *
 * Este serviço retorna os caminhos do template e do CSS correspondentes ao serviço especificado.
 *
 * @param servicoNome - Nome do serviço (ex.: "Finnet" ou "Nexxera").
 * @returns Um objeto contendo os caminhos do template HTML e do CSS.
 * @throws Lança um erro caso o nome do serviço seja inválido.
 */
function getTemplatePaths(servicoNome) {
    if (servicoNome === 'Finnet') {
        return {
            templatePath: path_1.default.join(__dirname, '../templateLetter/Finnet/templateFinnet.html'),
            cssPath: path_1.default.join(__dirname, '../templateLetter/Finnet/css/templateFinnet.css'),
        };
    }
    else if (servicoNome === 'Nexxera') {
        return {
            templatePath: path_1.default.join(__dirname, '../templateLetter/Nexxera/templateNexxera.html'),
            cssPath: path_1.default.join(__dirname, '../templateLetter/Nexxera/css/templateNexxera.css'),
        };
    }
    else {
        throw new Error('Serviço inválido. Use Finnet ou Nexxera.');
    }
}
