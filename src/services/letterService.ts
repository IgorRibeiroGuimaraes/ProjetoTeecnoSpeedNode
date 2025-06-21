import { prisma } from '../lib/prisma';

/**
 * Serviço para buscar um serviço pelo ID.
 *
 * @param servicoId - ID do serviço a ser buscado.
 * @returns Retorna os dados do serviço ou `null` se não encontrado.
 */
export async function findServicoById(servicoId: number) {
  return await prisma.servico.findUnique({ where: { id: servicoId } });
}

/**
 * Serviço para atualizar o serviço associado a uma carta.
 *
 * Este serviço recebe um objeto contendo o ID da carta e o ID do serviço a ser associado.
 *
 * @param data - Objeto contendo cartaId e servicoId.
 * @returns Retorna os dados da carta atualizada.
 */
export async function updateCartaServico(data: { cartaId: number; servicoId: number }) {
  const { cartaId, servicoId } = data;

  return await prisma.cartaVan.update({
    where: { id: cartaId },
    data: { servicoId },
  });
}
