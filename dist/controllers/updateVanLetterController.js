"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanLetterHandler = updateVanLetterHandler;
const updateVanLetterService_1 = require("../services/updateVanLetterService");
/**
 * Controller para atualizar campos específicos de uma carta VAN.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 */
async function updateVanLetterHandler(req, rep) {
    const { id } = req.params;
    const payload = req.body;
    try {
        const resultado = await (0, updateVanLetterService_1.updateVanLetterService)(id, payload);
        return rep.status(200).send({
            id: resultado.id,
            camposAlterados: resultado.camposAlterados,
        });
    }
    catch (error) {
        console.error('Erro ao atualizar a carta VAN:', error);
        return rep.status(500).send({
            erro: 'Erro ao atualizar a carta VAN',
            detalhe: error.message ?? 'Erro inesperado',
        });
    }
}
