"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVanLetterRoute = createVanLetterRoute;
const cartaVanController_1 = require("../controllers/cartaVanController");
const validationSchema_1 = require("../schemas/van/letter/validationSchema");
const authMiddleware_1 = require("../middlewares/authMiddleware");
async function createVanLetterRoute(fastify) {
    fastify.post('/carta-van', {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: validationSchema_1.vanSchema,
    }, cartaVanController_1.createVanLetterHandler);
}
