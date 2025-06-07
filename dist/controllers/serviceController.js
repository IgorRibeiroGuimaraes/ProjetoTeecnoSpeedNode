"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesController = getServicesController;
const serviceService_1 = require("../services/serviceService");
/**
 * Controller para buscar todos os serviços cadastrados.
 *
 * Este controller chama o serviço responsável por buscar todos os serviços no banco de dados
 * e retorna a lista de serviços como resposta.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna a lista de serviços ou um erro em caso de falha.
 */
async function getServicesController(req, rep) {
    try {
        // Chama o serviço para buscar todos os serviços
        const servicos = await (0, serviceService_1.getAllServices)();
        // Retorna a lista de serviços
        return rep.status(200).send(servicos);
    }
    catch (error) {
        // Loga o erro e retorna uma resposta de erro
        req.log.error('Erro ao consultar os serviços:', error);
        return rep.status(500).send({ erro: 'Erro ao consultar os serviços.' });
    }
}
