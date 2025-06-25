import { FastifyInstance } from 'fastify';
import { updateVanLetterHandler } from '../controllers/updateVanLetterController';
import { updateVanLetterSchema } from '../schemas/van/letter/updateVanLetterSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';

export async function updateVanLetterRoute(fastify: FastifyInstance) {
  fastify.patch('/van-letter/:id', {
    preHandler: verificarAutenticacao,
    schema: updateVanLetterSchema,
  }, updateVanLetterHandler);
}