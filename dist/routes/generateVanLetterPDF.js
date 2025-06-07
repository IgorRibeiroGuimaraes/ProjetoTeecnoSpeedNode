"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVanLetterPDFRoute = generateVanLetterPDFRoute;
const generateVanLetterPDFController_1 = require("../controllers/generateVanLetterPDFController");
const generateVanLetterPDFSchema_1 = require("../schemas/van/letter/generateVanLetterPDFSchema");
async function generateVanLetterPDFRoute(fastify) {
    fastify.post('/cartas/pdf', {
        schema: generateVanLetterPDFSchema_1.generateVanLetterPDFSchema,
    }, generateVanLetterPDFController_1.generateVanLetterPDFHandler);
}
