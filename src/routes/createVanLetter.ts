import { FastifyInstance } from 'fastify';
import { vanBodySchema } from '../schemas/vanBodySchema';
import { vanResponseSchema } from '../schemas/vanResponseSchema';
import { createVanLetterHandler } from '../handlers/createVanLetterHandler';

export async function createVanLetterRoute(fastify: FastifyInstance) {
  fastify.post('/carta-van', {
    schema: {
      summary: 'Criar Carta VAN',
      description:
        'Esta rota é utilizada para criar uma nova Carta VAN, um documento necessário para formalizar a autorização entre o cliente e a Software House junto ao banco.\n\n' +
        'A requisição deve conter informações do emitente, da Software House, do responsável, do banco e do gerente responsável.\n' +
        'Todos os dados são validados antes de serem armazenados e, em caso de sucesso, a carta é registrada no sistema com a data e hora da criação.\n\n' +
        'Essa rota é ideal para ser utilizada em sistemas administrativos ou portais internos que precisem gerar este documento para posterior assinatura e envio ao banco.',
      tags: ['Carta VAN'],
      body: vanBodySchema,
      response: vanResponseSchema,
    }
  }, createVanLetterHandler);
}
