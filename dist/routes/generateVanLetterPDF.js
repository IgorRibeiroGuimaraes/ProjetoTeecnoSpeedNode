"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAndGenerateVanLettrePDF = updateAndGenerateVanLettrePDF;
const updateLetterServiceController_1 = require("../controllers/updateLetterServiceController");
const updateLetterServiceSchema_1 = require("../schemas/van/letter/updateLetterServiceSchema");
const authMiddleware_1 = require("../middlewares/authMiddleware");
async function updateAndGenerateVanLettrePDF(fastify) {
    fastify.put('/cartas/generatepdf', {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: updateLetterServiceSchema_1.updateAndGenearateLetterServicPDFSchema,
    }, updateLetterServiceController_1.updateAndGenerateLetterServicePDFHandler);
}
