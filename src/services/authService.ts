import { CnpjNaoEncontradoError, SenhaInvalidaError } from '../errors/authErrors';
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
  const empresa = await prisma.empresa.findUnique({ where: { cnpj } });
  if (!empresa) {
    throw new CnpjNaoEncontradoError();
  }

  if (empresa.senha !== senha) {
    throw new SenhaInvalidaError();
  }

  const accessToken = gerarTokenJWT({ cnpj: empresa.cnpj, id: empresa.id });
  return { accessToken };
}

export { CnpjNaoEncontradoError, SenhaInvalidaError };