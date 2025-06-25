import { prisma } from '../lib/prisma';

/**
 * Verifica se a carta existe no banco de dados.
 * @param cartaId ID da carta.
 * @returns A carta encontrada ou null.
 */
export async function verificarCarta(cartaId: number) {
  return prisma.cartaVan.findUnique({
    where: { id: cartaId },
    include: {
      banco: true,
      produto: true,
      servico: true,
    }
  });
}

/**
 * Busca o ID do status "aberta".
 * @returns O status "aberta" ou null.
 */
export async function buscarStatusAberta() {
  return prisma.statusCarta.findUnique({
    where: { descricao: 'Aberta' },
  });
}

/**
 * Verifica o número de vezes que uma carta específica está com o status "aberta".
 * @param cartaId ID da carta.
 * @param statusId ID do status "aberta".
 * @returns O número de vezes que a carta está com o status "aberta".
 */
export async function contarCartasAbertasPorCarta(cartaId: number, statusId: number) {
  return prisma.cartaStatus.count({
    where: {
      cartaId,
      statusId,
    },
  });
}

/**
 * Associa o status "aberta" a uma carta existente.
 * @param cartaId ID da carta.
 * @param statusId ID do status "aberta".
 */
export async function associarStatusAberta(cartaId: number, statusId: number) {
  return prisma.cartaStatus.create({
    data: {
      cartaId,
      statusId,
    },
  });
}