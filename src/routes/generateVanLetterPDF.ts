import { FastifyInstance } from 'fastify';
import { generateVanLetterPDFHandler } from '../controllers/generateVanLetterPDFController';
import { generateVanLetterPDFSchema } from '../schemas/van/letter/generateVanLetterPDFSchema';

export async function generateVanLetterPDFRoute(fastify: FastifyInstance) {
  fastify.post('/cartas/pdf', {
    schema: generateVanLetterPDFSchema,
  }, generateVanLetterPDFHandler);
}