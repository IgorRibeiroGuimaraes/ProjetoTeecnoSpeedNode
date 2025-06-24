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
    console.log('NODE_ENV:', process.env.NODE_ENV); // Adicione este log
    rep.setCookie(nome, valor, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60,
    });
}
