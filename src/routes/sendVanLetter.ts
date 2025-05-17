import { FastifyInstance } from 'fastify';
import { sendVanLetterController } from '../controllers/sendVanLetterController';
import { sendVanLetterSchema } from '../schemas/van/letter/sendVanLetterSchema';
/**
 * Registra a rota para envio de uma Carta VAN.
 * 
 * Esta rota é utilizada para associar o status "aberta" a uma carta já criada.
 * 
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
export async function sendVanLetterRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/cartas/van/enviar',{
      schema: sendVanLetterSchema 
    }, sendVanLetterController
  );
}