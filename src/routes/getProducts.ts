import { FastifyInstance } from 'fastify';
import { getProductsHandler } from '../controllers/getProductsController';
import { getProductsSchema } from '../schemas/product/getProductsSchema';

/**
 * Registra a rota para obter os produtos disponíveis para um banco específico.
 *
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
export async function getProductsRoute(fastify: FastifyInstance) {
  fastify.get('/banco/:bancoId/produtos', {
    schema: getProductsSchema, // Usa o esquema importado
  }, getProductsHandler);
}