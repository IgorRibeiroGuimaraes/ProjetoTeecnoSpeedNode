import { FastifyRequest, FastifyReply } from 'fastify';
import { getProductsByBancoId } from '../services/getProductsService';
import { Produto } from '@prisma/client'; // Importa o tipo Produto gerado pelo Prisma

/**
 * Controller para obter os produtos disponíveis para um banco específico.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Nome do banco e lista de produtos disponíveis ou mensagem de erro.
 */
export async function getProductsHandler(req: FastifyRequest, rep: FastifyReply) {
  const { bancoId } = req.params as { bancoId: number };

  try {
    // Valida se o bancoId é um número válido
    if (!bancoId || isNaN(bancoId)) {
      return rep.status(400).send({
        erro: 'ID do banco inválido',
        detalhe: 'O ID do banco deve ser um número válido.',
      });
    }

    // Chama o serviço para obter os produtos associados ao banco
    const banco = await getProductsByBancoId(bancoId);

    // Verifica se o banco não possui produtos disponíveis
    if (!banco || !banco.produtosDisponiveis || banco.produtosDisponiveis.length === 0) {
      return rep.status(404).send({
        erro: 'Banco não encontrado ou sem produtos disponíveis',
        detalhe: `Nenhum produto foi encontrado para o banco com ID ${bancoId}.`,
      });
    }

    // Retorna o nome do banco e a lista de produtos encontrados
    const resposta = {
      bancoId: banco.bancoId,
      nomeBanco: banco.nomeBanco,
      produtosDisponiveis: banco.produtosDisponiveis.map((produto: Produto) => ({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
      })),
    };

    return rep.status(200).send(resposta);
  } catch (error: any) {
    // Log detalhado do erro para depuração
    console.error('Erro ao obter os produtos:', error);

    // Retorna erro 500 em caso de falha inesperada
    return rep.status(500).send({
      erro: 'Erro ao obter os produtos',
      detalhe: error.message ?? 'Erro inesperado',
    });
  }
}