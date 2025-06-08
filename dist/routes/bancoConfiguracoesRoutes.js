"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bancoConfiguracoesRoutes = bancoConfiguracoesRoutes;
const getBancoConfiguracoesController_1 = require("../controllers/getBancoConfiguracoesController");
const bancos_configuracoes_1 = require("../schemas/bank/bancos-configuracoes");
/**
 * Registra a rota de configurações bancárias.
 *
 * @param app - Instância do Fastify usada para registrar a rota.
 */
async function bancoConfiguracoesRoutes(app) {
    app.get("/bancos-configuracoes", {
        schema: bancos_configuracoes_1.bancoConfiguracoesSchema,
    }, getBancoConfiguracoesController_1.getBancoConfiguracoesHandler);
}
