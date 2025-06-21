"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bancoConfiguracoesRoutes = bancoConfiguracoesRoutes;
const getBancoConfiguracoesController_1 = require("../controllers/getBancoConfiguracoesController");
const bancos_configuracoes_1 = require("../schemas/bank/bancos-configuracoes");
const authMiddleware_1 = require("../middlewares/authMiddleware");
async function bancoConfiguracoesRoutes(app) {
    app.get("/bancos-configuracoes", {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: bancos_configuracoes_1.bancoConfiguracoesSchema,
    }, getBancoConfiguracoesController_1.getBancoConfiguracoesHandler);
}
