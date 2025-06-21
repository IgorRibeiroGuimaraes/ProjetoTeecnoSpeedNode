"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceRoute = getServiceRoute;
const serviceController_1 = require("../controllers/serviceController");
const getServicesSchema_1 = require("../schemas/service/getServicesSchema");
const authMiddleware_1 = require("../middlewares/authMiddleware");
async function getServiceRoute(fastify) {
    fastify.get('/servicos', {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: getServicesSchema_1.getServicesSchema,
    }, serviceController_1.getServicesController);
}
