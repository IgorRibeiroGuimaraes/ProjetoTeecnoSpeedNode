"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVanLetterRoutes = sendVanLetterRoutes;
const sendVanLetterController_1 = require("../controllers/sendVanLetterController");
const sendVanLetterSchema_1 = require("../schemas/van/letter/sendVanLetterSchema");
/**
 * Registra a rota para envio de uma Carta VAN.
 *
 * Esta rota é utilizada para associar o status "aberta" a uma carta já criada.
 *
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
async function sendVanLetterRoutes(fastify) {
    fastify.post('/cartas/van/enviar', {
        schema: sendVanLetterSchema_1.sendVanLetterSchema
    }, sendVanLetterController_1.sendVanLetterController);
}
