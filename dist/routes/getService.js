"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceRoute = getServiceRoute;
const serviceController_1 = require("../controllers/serviceController");
const getServicesSchema_1 = require("../schemas/service/getServicesSchema");
async function getServiceRoute(fastify) {
    fastify.get('/servicos', {
        schema: getServicesSchema_1.getServicesSchema,
    }, serviceController_1.getServicesController);
}
