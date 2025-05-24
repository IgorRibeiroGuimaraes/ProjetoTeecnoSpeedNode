import { FastifyInstance } from 'fastify';
import { updateCartaServicoHandler } from '../controllers/updateLetterServiceController';
import { updateLetterServiceSchema } from '../schemas/van/letter/updateLetterServiceSchema';


export async function updateCartaServicoRoute(fastify: FastifyInstance) {
  fastify.put('/cartas/:id/servico', {
    schema: updateLetterServiceSchema,
  }, updateCartaServicoHandler);
}