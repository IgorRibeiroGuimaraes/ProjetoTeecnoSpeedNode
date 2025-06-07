"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definirCookie = definirCookie;
/**
 * Define um cookie HTTP-only.
 * @param rep Resposta do Fastify.
 * @param nome Nome do cookie.
 * @param valor Valor do cookie.
 * @param maxAge Tempo de expiração do cookie em segundos.
 */
function definirCookie(rep, nome, valor, maxAge) {
    rep.setCookie(nome, valor, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Apenas em HTTPS em produção
        sameSite: 'strict', // Proteção contra CSRF
        path: '/',
        maxAge, // Tempo de expiração em segundos
    });
}
