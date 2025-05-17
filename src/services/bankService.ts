import { prisma } from '../lib/prisma';

/**
 * Serviço para buscar a lista de bancos no banco de dados.
 *
 * @returns Lista de bancos ordenada alfabeticamente.
 */
export async function getBankListService() {
  return await prisma.banco.findMany({
    select: {
      id: true,
      nome: true, // Nome do banco
    },
    orderBy: {
      id: 'asc', // Ordena os bancos em ordem alfabética
    },
  });
}