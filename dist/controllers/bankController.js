"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankListController = getBankListController;
const bankService_1 = require("../services/bankService");
/**
 * Controller para buscar a lista de bancos.
 *
 * @param request - Objeto da requisição HTTP.
 * @param reply - Objeto da resposta HTTP.
 */
async function getBankListController(request, reply) {
    try {
        // Chama o serviço para buscar a lista de bancos
        const banks = await (0, bankService_1.getBankListService)();
        // Retorna a lista de bancos no formato esperado
        return reply.status(200).send(banks);
    }
    catch (error) {
        request.log.error('Erro ao buscar a lista de bancos:', error);
        return reply.status(500).send({ error: 'Erro ao buscar a lista de bancos.' });
    }
}
