import { FastifyReply, FastifyRequest } from 'fastify';
import { autenticarUsuario, renovarAccessToken } from '../services/authService';
import { definirCookie } from '../utils/cookieUtils';
import { tratarErroInterno } from '../utils/errorHandler';

export async function loginController(req: FastifyRequest, rep: FastifyReply) {
  const { cnpj, senha } = req.body as { cnpj: string; senha: string };

  if (!cnpj || !senha) {
    return rep.status(400).send({ erro: 'CNPJ e senha são obrigatórios.' });
  }

  try {
    const { accessToken, refreshToken } = await autenticarUsuario(cnpj, senha);

    // Define os cookies para Access Token e Refresh Token
    definirCookie(rep, 'authToken', accessToken, 3600); // 1 hora
    definirCookie(rep, 'refreshToken', refreshToken, 7 * 24 * 60 * 60); // 7 dias

    return rep.status(200).send({
      mensagem: 'Autenticação bem-sucedida.',
      token: accessToken,
    });
  } catch (error) {
    return tratarErroInterno(rep, error);
  }
}

export async function refreshTokenController(req: FastifyRequest, rep: FastifyReply) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return rep.status(401).send({ erro: 'Refresh token não fornecido.' });
  }

  try {
    const newAccessToken = await renovarAccessToken(refreshToken);

    // Define o novo Access Token no cookie
    definirCookie(rep, 'authToken', newAccessToken, 3600); // 1 hora

    return rep.status(200).send({
      mensagem: 'Token renovado com sucesso.',
      token: newAccessToken,
    });
  } catch (error) {
    return tratarErroInterno(rep, error);
  }
}