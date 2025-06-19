import { FastifyInstance } from 'fastify';
import { updateCartaServicoHandler } from '../controllers/updateLetterServiceController';
import { updateLetterServiceSchema } from '../schemas/van/letter/updateLetterServiceSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';


export async function updateCartaServicoRoute(fastify: FastifyInstance) {
  fastify.put('/cartas/:id/servico', {
    preHandler: verificarAutenticacao,
    schema: updateLetterServiceSchema,
  }, updateCartaServicoHandler);
}