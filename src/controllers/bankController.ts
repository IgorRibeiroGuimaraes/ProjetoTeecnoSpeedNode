import { FastifyReply, FastifyRequest } from 'fastify';
import { getBankListService } from '../services/bankService';

/**
 * Controller para buscar a lista de bancos.
 *
 * @param request - Objeto da requisição HTTP.
 * @param reply - Objeto da resposta HTTP.
 */
export async function getBankListController(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Chama o serviço para buscar a lista de bancos
    const banks = await getBankListService();

    // Retorna a lista de bancos no formato esperado
    return reply.status(200).send(banks);
  } catch (error) {
    request.log.error('Erro ao buscar a lista de bancos:', error);
    return reply.status(500).send({ error: 'Erro ao buscar a lista de bancos.' });
  }
}