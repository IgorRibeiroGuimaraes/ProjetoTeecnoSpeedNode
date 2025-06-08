import { prisma } from '../lib/prisma';
import { gerarTokenJWT } from '../utils/jwtUtils';

/**
 * Serviço para autenticar o usuário.
 *
 * @param cnpj - CNPJ da empresa.
 * @param senha - Senha da empresa.
 * @returns Objeto contendo o Access Token.
 */
export async function autenticarUsuario(cnpj: string, senha: string): Promise<{ accessToken: string }> {
  // Busca a empresa pelo CNPJ
  const empresa = await prisma.empresa.findUnique({ where: { cnpj } });
  if (!empresa) {
    throw new Error('CNPJ não encontrado no sistema.');
  }

  // Valida a senha
  if (empresa.senha !== senha) {
    throw new Error('Senha inválida para o CNPJ fornecido.');
  }

  // Gera o Access Token
  const accessToken = gerarTokenJWT({ cnpj: empresa.cnpj, id: empresa.id });

  return { accessToken };
}