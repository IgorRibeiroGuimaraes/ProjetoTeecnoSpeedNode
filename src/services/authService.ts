import { prisma } from '../lib/prisma';
import { gerarTokenJWT, gerarRefreshToken, validarRefreshToken } from '../utils/jwtUtils';

export async function autenticarUsuario(cnpj: string, senha: string): Promise<{ accessToken: string; refreshToken: string }> {
  // Busca a empresa pelo CNPJ
  const empresa = await prisma.empresa.findUnique({ where: { cnpj } });
  if (!empresa) {
    throw new Error('CNPJ não encontrado no sistema.');
  }

  // Valida a senha
  if (empresa.senha !== senha) {
    throw new Error('Senha inválida para o CNPJ fornecido.');
  }

  // Gera os tokens
  const accessToken = gerarTokenJWT({ cnpj: empresa.cnpj, id: empresa.id });
  const refreshToken = gerarRefreshToken({ cnpj: empresa.cnpj, id: empresa.id });

  return { accessToken, refreshToken };
}

export async function renovarAccessToken(refreshToken: string): Promise<string> {
  try {
    // Valida o Refresh Token
    const payload = validarRefreshToken(refreshToken);

    // Gera um novo Access Token
    const newAccessToken = gerarTokenJWT({ cnpj: payload.cnpj, id: payload.id });

    return newAccessToken;
  } catch (error) {
    throw new Error('Refresh Token inválido ou expirado.');
  }
}