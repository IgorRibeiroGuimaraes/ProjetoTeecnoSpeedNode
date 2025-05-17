import { FastifyInstance } from 'fastify';
import { loginController, refreshTokenController } from '../controllers/authController';
import { loginSchema,refreshTokenSchema } from '../schemas/auth/authSchema';

/**
 * Registra as rotas de autenticação.
 * 
 * Estas rotas são utilizadas para autenticar usuários e renovar tokens de acesso.
 * 
 * @param fastify - Instância do Fastify usada para registrar as rotas.
 */
export async function authRoutes(fastify: FastifyInstance) {
  // Rota para login
  fastify.post(
    '/auth/login',{
      schema: loginSchema
    },loginController
  );

  // Rota para renovar o Access Token usando o Refresh Token
  fastify.post(
    '/auth/refresh',{
      schema:  refreshTokenSchema
    },refreshTokenController
  );
}