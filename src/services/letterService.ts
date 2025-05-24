import { prisma } from '../lib/prisma';

/**
 * Serviço para buscar um serviço pelo ID.
 *
 * Este serviço consulta o banco de dados para encontrar um serviço específico com base no ID fornecido.
 *
 * @param servicoId - ID do serviço a ser buscado.
 * @returns Retorna os dados do serviço ou `null` se não encontrado.
 */
export async function findServicoById(servicoId: number) {
  return await prisma.servico.findUnique({ where: { id: servicoId } });
}

/**
 * Serviço para buscar um serviço pelo nome.
 *
 * Este serviço consulta o banco de dados para encontrar um serviço específico com base no nome fornecido.
 *
 * @param servicoNome - Nome do serviço a ser buscado.
 * @returns Retorna os dados do serviço ou `null` se não encontrado.
 */
export async function findServicoByNome(servicoNome: string) {
  return await prisma.servico.findUnique({ where: { nome: servicoNome } });
}

/**
 * Serviço para atualizar o serviço associado a uma carta.
 *
 * Este serviço atualiza o registro de uma carta no banco de dados, associando-a a um novo serviço.
 *
 * @param cartaId - ID da carta a ser atualizada.
 * @param servicoId - ID do novo serviço a ser associado à carta.
 * @returns Retorna os dados da carta atualizada.
 */
export async function updateCartaServico(cartaId: number, servicoId: number) {
  return await prisma.cartaVan.update({
    where: { id: cartaId },
    data: { servicoId },
  });
}