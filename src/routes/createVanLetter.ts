import { FastifyInstance } from 'fastify';
import { createVanLetterHandler } from '../controllers/cartaVanController';
import { vanSchema } from '../schemas/van/letter/validationSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';

export async function createVanLetterRoute(fastify: FastifyInstance) {
  fastify.post('/letter-van', {
    preHandler: verificarAutenticacao,
    schema: vanSchema, 
  }, createVanLetterHandler);
}