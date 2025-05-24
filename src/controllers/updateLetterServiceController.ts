import { FastifyReply, FastifyRequest } from 'fastify';
import { findServicoById, findServicoByNome, updateCartaServico } from '../services/letterService';

/**
 * Controller para atualizar o serviço associado a uma carta.
 *
 * Este controller recebe o ID da carta e o ID ou nome do serviço a ser associado.
 * Ele valida os dados recebidos, busca o serviço no banco de dados e atualiza a carta
 * com o serviço correspondente.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna uma mensagem de sucesso com os dados da carta atualizada ou um erro em caso de falha.
 */
export async function updateCartaServicoHandler(req: FastifyRequest, rep: FastifyReply) {
  const { id } = req.params as { id: string };
  const { servicoId, servicoNome } = req.body as { servicoId?: number; servicoNome?: string };

  try {
    // Valida se o corpo da requisição foi enviado corretamente
    if (!servicoId && !servicoNome) {
      return rep.status(400).send({ erro: 'É necessário informar o servicoId ou servicoNome.' });
    }

    // Busca o serviço pelo ID ou pelo nome
    let servico;
    if (servicoId) {
      servico = await findServicoById(servicoId);
    } else if (servicoNome) {
      servico = await findServicoByNome(servicoNome);
    }

    // Verifica se o serviço foi encontrado
    if (!servico) {
      return rep.status(404).send({ erro: 'Serviço não encontrado.' });
    }

    // Atualiza o serviço na carta
    const carta = await updateCartaServico(parseInt(id, 10), servico.id);

    // Retorna a resposta de sucesso
    return rep.status(200).send({ mensagem: 'Serviço atualizado com sucesso.', carta });
  } catch (error) {
    // Loga o erro e retorna uma resposta de erro
    console.error('Erro ao atualizar serviço:', error);
    return rep.status(500).send({ erro: 'Erro ao atualizar o serviço da carta.' });
  }
}