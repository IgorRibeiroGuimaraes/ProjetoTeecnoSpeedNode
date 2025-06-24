"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLetterController = getLetterController;
const buscarCartaPorCnpjService_1 = require("../services/buscarCartaPorCnpjService");
const supabaseStorage_1 = require("../storage/supabaseStorage");
const listcnpjletterschema_1 = require("../schemas/van/letter/listcnpjletterschema");
/**
 * Handler para o envio do PDF.
 */
async function getLetterController(request, reply) {
    try {
        // Validação usando Zod
        const { cnpj } = listcnpjletterschema_1.listLetterCNPJSchema.parse(request).query;
        const carta = await (0, buscarCartaPorCnpjService_1.buscarCartaPorCnpjService)(cnpj);
        if (!carta) {
            return reply.status(404).send({ message: 'Carta não encontrada para o CNPJ informado.' });
        }
        const sanitizedCnpj = cnpj.replace(/[^\d]/g, '');
        const dataCriacaoFormatada = carta.createdAt.toISOString().split('T')[0];
        const filePathInBucket = `${sanitizedCnpj}/${dataCriacaoFormatada}/carta_${carta.servicoNome}_${carta.id}.pdf`;
        console.log(filePathInBucket);
        const signedUrl = await (0, supabaseStorage_1.getSignedUrl)(filePathInBucket, 3600);
        if (!signedUrl) {
            return reply.status(500).send({ message: 'Não foi possível gerar a URL do arquivo.' });
        }
        return reply.send({
            id_da_carta: carta.id,
            banco: carta.banco,
            produto: carta.produto,
            tipoCnab: carta.tipoCnab,
            servico: carta.servicoNome,
            pdfUrl: signedUrl,
            dataCriacao: carta.dataCriacao,
        });
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return reply.status(400).send({
                message: 'Parâmetros inválidos.',
                detalhes: error.errors
            });
        }
        console.error(error);
        return reply.status(500).send({ message: 'Erro interno ao buscar a carta.' });
    }
}
