import { FastifyInstance } from 'fastify';
import { loginController, logoutController } from '../controllers/authController';
import { verificarAutenticacao } from '../middlewares/authMiddleware';
import { loginSchema } from '../schemas/auth/authSchema';
import { logoutSchema } from '../schemas/auth/logout';
import { protectedSchema } from '../schemas/auth/protected';

/**
 * Registra as rotas de autenticação.
 *
 * @param fastify - Instância do Fastify usada para registrar as rotas.
 */
export async function authRoutes(fastify: FastifyInstance) {
  // Rota para login
  fastify.post(
    '/auth/login',
    {
      schema: loginSchema,
    },
    loginController
  );

  // Rota para logout
  fastify.post(
    '/auth/logout',
    {
      schema: logoutSchema,
    },
    logoutController
  );

  // Rota protegida
  fastify.get(
    '/auth/protected',
    {
      preHandler: verificarAutenticacao,
      schema: protectedSchema,
    },
    async (req, rep) => {
      return rep.send({ mensagem: 'Você está autenticado!' });
    }
  );
}