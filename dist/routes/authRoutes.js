"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const authController_1 = require("../controllers/authController");
const authSchema_1 = require("../schemas/auth/authSchema");
/**
 * Registra as rotas de autenticação.
 *
 * Estas rotas são utilizadas para autenticar usuários e renovar tokens de acesso.
 *
 * @param fastify - Instância do Fastify usada para registrar as rotas.
 */
async function authRoutes(fastify) {
    // Rota para login
    fastify.post('/auth/login', {
        schema: authSchema_1.loginSchema
    }, authController_1.loginController);
    // Rota para renovar o Access Token usando o Refresh Token
    fastify.post('/auth/refresh', {
        schema: authSchema_1.refreshTokenSchema
    }, authController_1.refreshTokenController);
}
