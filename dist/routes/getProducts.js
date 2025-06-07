"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRoute = getProductsRoute;
const getProductsController_1 = require("../controllers/getProductsController");
const getProductsSchema_1 = require("../schemas/product/getProductsSchema");
/**
 * Registra a rota para obter os produtos disponíveis para um banco específico.
 *
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
async function getProductsRoute(fastify) {
    fastify.get('/banco/:bancoId/produtos', {
        schema: getProductsSchema_1.getProductsSchema, // Usa o esquema importado
    }, getProductsController_1.getProductsHandler);
}
