import { prisma } from '../lib/prisma';
import { Produto } from '@prisma/client'; // Importa o tipo Produto gerado pelo Prisma

/**
 * Serviço para obter o nome do banco e os produtos disponíveis para um banco específico.
 *
 * @param bancoId - ID do banco para o qual os produtos devem ser buscados.
 * @returns Nome do banco e lista de produtos disponíveis.
 */
export async function getProductsByBancoId(bancoId: number) {
  try {
    // Busca o banco e os produtos associados no banco de dados
    const banco = await prisma.banco.findUnique({
      where: { id: bancoId },
      select: {
        id: true,
        nome: true, // Nome do banco
        produtos: {
          select: {
            produto: {
              select: {
                id: true,
                nome: true, // Nome do produto
                descricao: true, // Descrição do produto
              },
            },
          },
        },
      },
    });

    // Verifica se o banco foi encontrado
    if (!banco) {
      throw new Error(`Banco com ID ${bancoId} não encontrado.`);
    }

    // Mapeia os produtos para o formato esperado
    const produtosDisponiveis = banco.produtos.map((relacao: { produto: Produto }) => relacao.produto);

    return {
      bancoId: banco.id,
      nomeBanco: banco.nome,
      produtosDisponiveis,
    };
  } catch (error) {
    console.error('Erro ao buscar banco e produtos no serviço:', error);

    // Lança o erro para ser tratado no controller
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar banco e produtos para o banco com ID ${bancoId}: ${error.message}`);
    } else {
      throw new Error(`Erro ao buscar banco e produtos para o banco com ID ${bancoId}: Erro desconhecido`);
    }
  }
}