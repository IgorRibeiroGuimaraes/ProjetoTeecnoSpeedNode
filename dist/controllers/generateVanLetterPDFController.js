"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVanLetterPDFHandler = generateVanLetterPDFHandler;
const generateVanLetterPDFService_1 = require("../services/generateVanLetterPDFService");
const supabaseStorage_1 = require("../storage/supabaseStorage");
const letterTemplateService_1 = require("../services/letterTemplateService");
/**
 * Handler para geração do PDF da carta VAN
 * Este handler é responsável por:
 * 1. Gerar o PDF da carta com base no template e nos dados da carta.
 * 2. Fazer o upload do PDF gerado para o Supabase.
 * 3. Retornar a URL assinada do PDF gerado.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
async function generateVanLetterPDFHandler(cartaId) {
    console.log('Iniciando geração do PDF para cartaId:', cartaId);
    const carta = await (0, generateVanLetterPDFService_1.getCartaById)(cartaId);
    if (!carta) {
        console.error('Carta não encontrada');
        throw new Error('Carta não encontrada.');
    }
    if (!carta.servico) {
        console.error('Serviço não definido para esta carta.');
        throw new Error('Serviço não definido para esta carta.');
    }
    const html = (0, letterTemplateService_1.generateLetterHtmlFromTemplate)(carta);
    console.log('HTML gerado');
    const pdfBuffer = await (0, generateVanLetterPDFService_1.generatePDF)(html);
    console.log('PDF gerado, tamanho:', pdfBuffer.length);
    const clientId = carta.cnpjEmitente || 'default-client';
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `carta_${carta.servico.nome}_${carta.id}.pdf`;
    const filePathInBucket = `${clientId}/${currentDate}/${fileName}`;
    await (0, supabaseStorage_1.uploadPdfToSupabase)(pdfBuffer, filePathInBucket);
    console.log('PDF enviado para Supabase:', filePathInBucket);
    const signedUrl = await (0, supabaseStorage_1.getSignedUrl)(filePathInBucket, 3600);
    console.log('URL assinada obtida:', signedUrl);
    if (!signedUrl) {
        console.error('Erro ao gerar URL assinada.');
        throw new Error('Erro ao gerar URL assinada.');
    }
    return signedUrl;
}
