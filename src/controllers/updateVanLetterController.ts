import { FastifyRequest, FastifyReply } from 'fastify';
import { updateVanLetterService } from '../services/updateVanLetterService';

/**
 * Controller para atualizar campos específicos de uma carta VAN.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 */
export async function updateVanLetterHandler(req: FastifyRequest, rep: FastifyReply) {
  const { id } = req.params as { id: number };
  const payload = req.body;

  try {
    const resultado = await updateVanLetterService(id, payload);

    return rep.status(200).send({
      id: resultado.id,
      camposAlterados: resultado.camposAlterados,
    });
  } catch (error: any) {
    console.error('Erro ao atualizar a carta VAN:', error);
    return rep.status(500).send({
      erro: 'Erro ao atualizar a carta VAN',
      detalhe: error.message ?? 'Erro inesperado',
    });
  }
}