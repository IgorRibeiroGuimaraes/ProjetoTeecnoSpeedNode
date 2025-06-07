"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartaServicoRoute = updateCartaServicoRoute;
const updateLetterServiceController_1 = require("../controllers/updateLetterServiceController");
const updateLetterServiceSchema_1 = require("../schemas/van/letter/updateLetterServiceSchema");
async function updateCartaServicoRoute(fastify) {
    fastify.put('/cartas/:id/servico', {
        schema: updateLetterServiceSchema_1.updateLetterServiceSchema,
    }, updateLetterServiceController_1.updateCartaServicoHandler);
}
