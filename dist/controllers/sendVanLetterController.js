"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVanLetterController = sendVanLetterController;
const sendVanLetterService_1 = require("../services/sendVanLetterService");
const supabaseStorage_1 = require("../storage/supabaseStorage");
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const sendVanLetterSchema_1 = require("../schemas/van/letter/sendVanLetterSchema");
/**
 * Handler para o envio do PDF
 * Este handler é responsável por:
 * 1. Verifcar se a carta existe
 * 2. Validar se o status "aberta" existe e se a carta não atingiu o limite de 5 validações.
 * 3. Fazer o envio do PDF para o Supabase em base64.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
async function sendVanLetterController(req, rep) {
    try {
        // Validação com Zod
        const { cartaId } = sendVanLetterSchema_1.sendVanLetterSchemaRequest.parse(req).body;
        const carta = await (0, sendVanLetterService_1.verificarCarta)(cartaId);
        if (!carta) {
            return rep.status(404).send({ erro: 'Carta não encontrada.' });
        }
        const statusAberta = await (0, sendVanLetterService_1.buscarStatusAberta)();
        if (!statusAberta) {
            return rep.status(500).send({ erro: 'Status "aberta" não encontrado no sistema.' });
        }
        const cartasAbertas = await (0, sendVanLetterService_1.contarCartasAbertasPorCarta)(cartaId, statusAberta.id);
        if (cartasAbertas >= 5) {
            return rep.status(400).send({
                erro: 'Limite de 5 validações atingido para esta carta. Aguarde antes de tentar novamente.',
            });
        }
        await (0, sendVanLetterService_1.associarStatusAberta)(cartaId, statusAberta.id);
        // Recuperar o PDF do Supabase
        const currentDate = new Date().toISOString().split('T')[0];
        const filePathInBucket = `${carta.cnpjEmitente}/${currentDate}/carta_${carta.servico?.nome}_${cartaId}.pdf`;
        const base64PDF = await (0, supabaseStorage_1.downloadFileFromSupabaseAsBase64)(filePathInBucket);
        // Dados para enviar e logar
        const dataToSend = {
            cnpj_SH: '11111111111111',
            email: 'guilherme.ganassin@tecnospeed.com.br',
            arquivo: '[arquivo PDF base64 - omitido]',
            CNPJ_cliente: carta.cnpjEmitente,
            Produto: carta.produto.nome,
        };
        // Montar formData
        const formData = new form_data_1.default();
        formData.append('cnpj_SH', dataToSend.cnpj_SH);
        formData.append('email', dataToSend.email);
        formData.append('arquivo', `data:application/pdf;base64,${base64PDF}`);
        formData.append('CNPJ_cliente', dataToSend.CNPJ_cliente);
        formData.append('Produto', dataToSend.Produto);
        // Enviar para o Zapier
        const response = await axios_1.default.post('https://hooks.zapier.com/hooks/catch/21923307/2gwb3a6/', formData, {
            headers: formData.getHeaders(),
        });
        console.log('Resposta do Zapier:', response.data);
        return rep.status(201).send({
            mensagem: 'Carta enviada com sucesso e arquivo enviado ao Zapier.',
            dadosEnviados: dataToSend,
            respostaZapier: response.data,
        });
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return rep.status(400).send({
                erro: 'Dados inválidos no body.',
                detalhes: error.errors
            });
        }
        console.error('Erro ao enviar carta:', error);
        return rep.status(500).send({ erro: 'Erro interno ao enviar a carta.' });
    }
}
