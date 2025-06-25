import { prisma } from '../lib/prisma';

/**
 * Serviço para buscar todos os serviços cadastrados.
 *
 * Este serviço consulta o banco de dados para obter a lista de todos os serviços disponíveis.
 * Caso ocorra algum erro durante a consulta, ele lança uma exceção para ser tratada no controller.
 *
 * @returns Retorna uma lista de serviços cadastrados no banco de dados.
 * @throws Lança um erro caso ocorra algum problema durante a consulta.
 */
export async function getAllServices() {
  try {
    return await prisma.servico.findMany();
  } catch (error) {
    console.error('Erro ao consultar serviços:', error);
    throw new Error('Erro ao consultar os serviços.');
  }
}