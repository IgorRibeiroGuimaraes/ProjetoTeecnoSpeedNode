import { FastifyInstance } from 'fastify';
import { sendVanLetterController } from '../controllers/sendVanLetterController';
import { sendVanLetterSchema, SendVanLetterBody } from '../schemas/van/letter/sendVanLetterSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';

/**
 * Registra a rota para envio de uma Carta VAN.
 * 
 * Esta rota é utilizada para associar o status "aberta" a uma carta já criada.
 * 
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
export async function sendVanLetterRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: SendVanLetterBody; // Define o tipo do corpo da requisição
  }>(
    '/cartas/van/enviar',
    {
      schema: sendVanLetterSchema,
      preHandler: verificarAutenticacao, 
    },
    sendVanLetterController
  );
}