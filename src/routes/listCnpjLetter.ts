import { FastifyInstance } from 'fastify';
import { verificarAutenticacao } from '../middlewares/authMiddleware';
import { getLetterController } from '../controllers/listCnpjLetterController';
import { listcnpjletterschema } from '../schemas/van/letter/listcnpjletterschema';


export async function cartaRoutes(fastify: FastifyInstance) {
  fastify.get('/list-letter', {
    preHandler: verificarAutenticacao,
    schema: listcnpjletterschema,
  }, getLetterController);
}
