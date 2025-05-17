import { FastifyInstance } from 'fastify';
import { getBankListController } from '../controllers/bankController';
import { getBankListSchema } from '../schemas/bank/getBankListSchema';

export async function getBankListRoutes(fastify: FastifyInstance) {
  fastify.get('/banks', { schema: getBankListSchema }, getBankListController);
}