import { FastifyInstance } from 'fastify';
import { updateVanLetterHandler } from '../controllers/updateVanLetterController';
import { updateVanLetterSchema } from '../schemas/van/letter/updateVanLetterSchema';

export async function updateVanLetterRoute(fastify: FastifyInstance) {
  fastify.patch('/van-letter/:id', {
    schema: updateVanLetterSchema,
  }, updateVanLetterHandler);
}