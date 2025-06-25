import { FastifyInstance } from 'fastify';
import { getServicesController } from '../controllers/serviceController';
import { getServicesSchema } from '../schemas/service/getServicesSchema';
import { verificarAutenticacao } from '../middlewares/authMiddleware';

export async function getServiceRoute(fastify: FastifyInstance) {
  fastify.get('/services', {
    preHandler: verificarAutenticacao,
    schema: getServicesSchema,
  }, getServicesController);
}
