"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVanLetterController = sendVanLetterController;
const sendVanLetterService_1 = require("../services/sendVanLetterService");
async function sendVanLetterController(req, rep) {
    const { cartaId } = req.body;
    try {
        // 1. Verificar se a carta existe
        const carta = await (0, sendVanLetterService_1.verificarCarta)(cartaId);
        if (!carta) {
            return rep.status(404).send({ erro: 'Carta não encontrada.' });
        }
        // 2. Buscar o ID do status "aberta"
        const statusAberta = await (0, sendVanLetterService_1.buscarStatusAberta)();
        if (!statusAberta) {
            return rep.status(500).send({ erro: 'Status "aberta" não encontrado no sistema.' });
        }
        // 3. Verificar o número de vezes que a carta está com o status "aberta"
        const cartasAbertas = await (0, sendVanLetterService_1.contarCartasAbertasPorCarta)(cartaId, statusAberta.id);
        if (cartasAbertas >= 5) {
            return rep.status(400).send({
                erro: 'Limite de 5 validações atingido para esta carta. Aguarde antes de tentar novamente.',
            });
        }
        // 4. Associar o status "aberta" à carta existente
        await (0, sendVanLetterService_1.associarStatusAberta)(cartaId, statusAberta.id);
        return rep.status(201).send({
            mensagem: 'Carta enviada com sucesso.',
            carta,
        });
    }
    catch (error) {
        console.error('Erro ao enviar carta:', error);
        return rep.status(500).send({ erro: 'Erro interno ao enviar a carta.' });
    }
}
