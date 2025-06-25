import { FastifyInstance } from 'fastify';
import { updateAndGenerateLetterServicePDFHandler } from '../controllers/updateLetterServiceController';
import { updateAndGenearateLetterServicPDFSchema } from '../schemas/van/letter/updateLetterServiceSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';


export async function updateAndGenerateVanLettrePDF(fastify: FastifyInstance) {
  fastify.put('/letter/generatepdf', {
    preHandler: verificarAutenticacao,
    schema: updateAndGenearateLetterServicPDFSchema,
  }, updateAndGenerateLetterServicePDFHandler);
}