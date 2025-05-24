import { FastifyInstance } from 'fastify';
import { getServicesController } from '../controllers/serviceController';
import { getServicesSchema } from '../schemas/service/getServicesSchema';

export async function getServiceRoute(fastify: FastifyInstance) {
  fastify.get('/servicos', {
    schema: getServicesSchema,
  }, getServicesController);
}