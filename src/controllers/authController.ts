import { FastifyReply, FastifyRequest } from 'fastify';
import { autenticarUsuario, renovarAccessToken } from '../services/authService';
import { definirCookie } from '../utils/cookieUtils';
import { tratarErroInterno } from '../utils/errorHandler';

/**
 * Controller para autenticar um usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um token de acesso e define cookies para autenticação.
 */
export async function loginController(req: FastifyRequest, rep: FastifyReply) {
  const { cnpj, senha } = req.body as { cnpj: string; senha: string };

  // Valida se os campos obrigatórios foram fornecidos
  if (!cnpj || !senha) {
    return rep.status(400).send({ erro: 'CNPJ e senha são obrigatórios.' });
  }

  try {
    // Chama o serviço para autenticar o usuário
    const { accessToken, refreshToken } = await autenticarUsuario(cnpj, senha);

    // Define os cookies para Access Token e Refresh Token
    definirCookie(rep, 'authToken', accessToken, 3600); // 1 hora
    definirCookie(rep, 'refreshToken', refreshToken, 7 * 24 * 60 * 60); // 7 dias

    // Retorna a resposta de sucesso
    return rep.status(200).send({
      mensagem: 'Autenticação bem-sucedida.',
      token: accessToken,
    });
  } catch (error) {
    // Trata erros internos
    return tratarErroInterno(rep, error);
  }
}

/**
 * Controller para renovar o token de acesso.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um novo token de acesso e redefine o cookie de autenticação.
 */
export async function refreshTokenController(req: FastifyRequest, rep: FastifyReply) {
  const refreshToken = req.cookies.refreshToken;

  // Valida se o refresh token foi fornecido
  if (!refreshToken) {
    return rep.status(401).send({ erro: 'Refresh token não fornecido.' });
  }

  try {
    // Chama o serviço para renovar o token de acesso
    const newAccessToken = await renovarAccessToken(refreshToken);

    // Define o novo Access Token no cookie
    definirCookie(rep, 'authToken', newAccessToken, 3600); // 1 hora

    // Retorna a resposta de sucesso
    return rep.status(200).send({
      mensagem: 'Token renovado com sucesso.',
      token: newAccessToken,
    });
  } catch (error) {
    // Trata erros internos
    return tratarErroInterno(rep, error);
  }
}