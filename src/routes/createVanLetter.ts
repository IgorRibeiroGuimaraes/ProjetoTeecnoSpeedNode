import { FastifyInstance } from 'fastify';
import { vanBodySchema } from '../schemas/van/letter/validationSchema';
import { vanResponseSchema } from '../schemas/van/letter/ResponseSchema';
import { createVanLetterHandler } from '../controllers/cartaVanController';

/**
 * Registra a rota para criação de uma Carta VAN.
 * 
 * Esta rota é utilizada para criar uma nova Carta VAN, um documento necessário para formalizar
 * a autorização entre o cliente e a Software House junto ao banco. A requisição deve conter
 * informações do emitente, do responsável, do banco e do gerente responsável.
 * 
 * Todos os dados são validados antes de serem armazenados e, em caso de sucesso, a carta é
 * registrada no sistema com a data e hora da criação.
 * 
 * @param fastify - Instância do Fastify usada para registrar a rota.
 */
export async function createVanLetterRoute(fastify: FastifyInstance) {
  fastify.post(
    '/carta-van',
    {
      schema: {
        summary: 'Criar Carta VAN', // Resumo da funcionalidade da rota
        description:
          'Esta rota é utilizada para criar uma nova Carta VAN, um documento necessário para formalizar a autorização entre o cliente e a Software House junto ao banco.\n\n' +
          'A requisição deve conter informações do emitente, do responsável, do banco e do gerente responsável.\n' +
          'Todos os dados são validados antes de serem armazenados e, em caso de sucesso, a carta é registrada no sistema com a data e hora da criação.\n\n' +
          'Essa rota é ideal para ser utilizada em sistemas administrativos ou portais internos que precisem gerar este documento para posterior assinatura e envio ao banco.',
        tags: ['Carta VAN'], // Tag para categorizar a rota na documentação
        body: vanBodySchema, // Esquema de validação do corpo da requisição
        response: vanResponseSchema, // Esquema de validação da resposta
      },
    },
    createVanLetterHandler // Handler responsável por processar a requisição
  );
}