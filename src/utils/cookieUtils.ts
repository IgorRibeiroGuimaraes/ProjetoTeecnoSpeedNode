import { FastifyReply } from 'fastify';

/**
 * Define um cookie HTTP-only.
 * @param rep Resposta do Fastify.
 * @param nome Nome do cookie.
 * @param valor Valor do cookie.
 * @param maxAge Tempo de expiração do cookie em segundos.
 */
export function definirCookie(rep: FastifyReply, nome: string, valor: string, maxAge: number) {
  rep.setCookie(nome, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Apenas em HTTPS em produção
    sameSite: 'strict', // Proteção contra CSRF
    path: '/',
    maxAge, // Tempo de expiração em segundos
  });
}