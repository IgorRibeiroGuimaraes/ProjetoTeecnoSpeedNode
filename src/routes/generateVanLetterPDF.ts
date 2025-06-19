import { FastifyInstance } from 'fastify';
import { generateVanLetterPDFHandler } from '../controllers/generateVanLetterPDFController';
import { generateVanLetterPDFSchema } from '../schemas/van/letter/generateVanLetterPDFSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';

export async function generateVanLetterPDFRoute(fastify: FastifyInstance) {
  fastify.post('/cartas/pdf', {
    preHandler: verificarAutenticacao,
    schema: generateVanLetterPDFSchema,
  }, generateVanLetterPDFHandler);
}