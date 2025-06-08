"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authSchema_1 = require("../schemas/auth/authSchema");
const logout_1 = require("../schemas/auth/logout");
const protected_1 = require("../schemas/auth/protected");
/**
 * Registra as rotas de autenticação.
 *
 * @param fastify - Instância do Fastify usada para registrar as rotas.
 */
async function authRoutes(fastify) {
    // Rota para login
    fastify.post('/auth/login', {
        schema: authSchema_1.loginSchema,
    }, authController_1.loginController);
    // Rota para logout
    fastify.post('/auth/logout', {
        schema: logout_1.logoutSchema,
    }, authController_1.logoutController);
    // Rota protegida
    fastify.get('/auth/protected', {
        preHandler: authMiddleware_1.verificarAutenticacao,
        schema: protected_1.protectedSchema,
    }, async (req, rep) => {
        return rep.send({ mensagem: 'Você está autenticado!' });
    });
}
