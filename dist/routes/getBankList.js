"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankListRoutes = getBankListRoutes;
const bankController_1 = require("../controllers/bankController");
const getBankListSchema_1 = require("../schemas/bank/getBankListSchema");
async function getBankListRoutes(fastify) {
    fastify.get('/banks', { schema: getBankListSchema_1.getBankListSchema }, bankController_1.getBankListController);
}
