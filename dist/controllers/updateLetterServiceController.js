"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAndGenerateLetterServicePDFHandler = updateAndGenerateLetterServicePDFHandler;
const letterService_1 = require("../services/letterService");
const generateVanLetterPDFController_1 = require("./generateVanLetterPDFController");
/**
 * Controller para atualizar o serviço associado a uma carta.
 *
 * Recebe no body o ID da carta e o ID do serviço a ser associado.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna uma mensagem de sucesso com os dados da carta atualizada ou um erro em caso de falha.
 */
async function updateAndGenerateLetterServicePDFHandler(req, rep) {
    const { cartaId, servicoId } = req.body;
    if (!cartaId || !servicoId) {
        return rep.status(400).send({ erro: 'É necessário informar o ID da carta e o ID do serviço.' });
    }
    try {
        const servico = await (0, letterService_1.findServicoById)(servicoId);
        if (!servico) {
            return rep.status(404).send({ erro: 'Serviço não encontrado.' });
        }
        const carta = await (0, letterService_1.updateCartaServico)({ cartaId, servicoId: servico.id });
        const signedUrl = await (0, generateVanLetterPDFController_1.generateVanLetterPDFHandler)(cartaId); // gera e retorna a URL do PDF
        return rep.status(200).send({
            mensagem: 'Serviço atualizado e PDF gerado com sucesso.',
            carta,
            pdfUrl: signedUrl // aqui já retorna a URL gerada
        });
    }
    catch (error) {
        console.error('Erro ao atualizar serviço ou gerar PDF:', error);
        return rep.status(500).send({ erro: 'Erro ao atualizar o serviço da carta ou gerar o PDF.' });
    }
}
