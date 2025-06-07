"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanLetterRoute = updateVanLetterRoute;
const updateVanLetterController_1 = require("../controllers/updateVanLetterController");
const updateVanLetterSchema_1 = require("../schemas/van/letter/updateVanLetterSchema");
async function updateVanLetterRoute(fastify) {
    fastify.patch('/van-letter/:id', {
        schema: updateVanLetterSchema_1.updateVanLetterSchema,
    }, updateVanLetterController_1.updateVanLetterHandler);
}
