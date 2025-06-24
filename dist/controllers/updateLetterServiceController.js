"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAndGenerateLetterServicePDFHandler = updateAndGenerateLetterServicePDFHandler;
const letterService_1 = require("../services/letterService");
const generateVanLetterPDFController_1 = require("./generateVanLetterPDFController");
const updateLetterServicePDFSchema_1 = require("../schemas/van/letter/updateLetterServicePDFSchema"); // schema criado
async function updateAndGenerateLetterServicePDFHandler(req, rep) {
    try {
        // Faz a validação usando Zod
        const { cartaId, servicoId } = updateLetterServicePDFSchema_1.updateLetterServiceSchema.parse(req.body);
        const servico = await (0, letterService_1.findServicoById)(servicoId);
        if (!servico) {
            return rep.status(404).send({ erro: 'Serviço não encontrado.' });
        }
        const carta = await (0, letterService_1.updateCartaServico)({ cartaId, servicoId: servico.id });
        const signedUrl = await (0, generateVanLetterPDFController_1.generateVanLetterPDFHandler)(cartaId);
        return rep.status(200).send({
            mensagem: 'Serviço atualizado e PDF gerado com sucesso.',
            carta,
            pdfUrl: signedUrl
        });
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return rep.status(400).send({ erro: 'Dados inválidos.', detalhes: error.errors });
        }
        console.error('Erro ao atualizar serviço ou gerar PDF:', error);
        return rep.status(500).send({ erro: 'Erro ao atualizar o serviço da carta ou gerar o PDF.' });
    }
}
