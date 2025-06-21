"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartaRoutes = cartaRoutes;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const listCnpjLetterController_1 = require("../controllers/listCnpjLetterController");
const listcnpjletterschema_1 = require("../schemas/van/letter/listcnpjletterschema");
async function cartaRoutes(fastify) {
    fastify.get('/list-cartas', {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: listcnpjletterschema_1.listcnpjletterschema,
    }, listCnpjLetterController_1.getLetterController);
}
