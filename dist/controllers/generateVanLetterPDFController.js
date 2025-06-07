"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVanLetterPDFHandler = generateVanLetterPDFHandler;
const generateVanLetterPDFService_1 = require("../services/generateVanLetterPDFService");
const fs_1 = __importDefault(require("fs"));
/**
 * Controller para gerar o PDF de uma Van Letter.
 *
 * Este controller busca os dados de uma carta no banco de dados, aplica os dados em um template HTML,
 * e gera um PDF com base no serviço associado à carta.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna o PDF gerado como resposta ou um erro em caso de falha.
 */
async function generateVanLetterPDFHandler(req, rep) {
    const { cartaId } = req.body;
    try {
        // Busca a carta no banco de dados
        const carta = await (0, generateVanLetterPDFService_1.getCartaById)(cartaId);
        // Verifica se a carta foi encontrada
        if (!carta) {
            return rep.status(404).send({ erro: 'Carta não encontrada.' });
        }
        // Verifica se o serviço está definido para a carta
        if (!carta.servico) {
            return rep.status(400).send({ erro: 'Serviço não definido para esta carta.' });
        }
        // Obtém os caminhos do template e do CSS com base no serviço
        const { templatePath, cssPath } = (0, generateVanLetterPDFService_1.getTemplatePaths)(carta.servico.nome);
        // Lê o template HTML e o CSS
        let html = fs_1.default.readFileSync(templatePath, 'utf8');
        const cssContent = fs_1.default.readFileSync(cssPath, 'utf8');
        // Insere o CSS no HTML
        html = html.replace('</head>', `<style>${cssContent}</style></head>`);
        // Substitui os placeholders no HTML com os dados da carta
        html = html
            .replace('[NOME DO BANCO]', carta.banco.nome)
            .replace('[NOME DA EMPRESA]', carta.razaoSocial || '')
            .replace('[CNPJ DA EMPRESA]', carta.cnpjEmitente || '');
        // Gera o PDF a partir do HTML
        const pdfBuffer = await (0, generateVanLetterPDFService_1.generatePDF)(html);
        // Define os headers e retorna o PDF como resposta
        const fileName = `carta_${carta.servico.nome}.pdf`;
        rep.header('Content-Type', 'application/pdf');
        rep.header('Content-Disposition', `attachment; filename="${fileName}"`);
        return rep.send(pdfBuffer);
    }
    catch (error) {
        // Loga o erro e retorna uma resposta de erro
        console.error('Erro ao gerar PDF:', error);
        return rep.status(500).send({ erro: 'Erro ao gerar o PDF.' });
    }
}
