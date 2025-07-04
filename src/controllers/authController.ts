import { FastifyReply, FastifyRequest } from 'fastify';
import { autenticarUsuario, CnpjNaoEncontradoError, SenhaInvalidaError } from '../services/authService';
import { definirCookie } from '../utils/cookieUtils';

/**
 * Controller para autenticar um usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um token de acesso e define cookies para autenticação.
 */
export async function loginController(req: FastifyRequest, rep: FastifyReply) {
  const { cnpj, senha } = req.body as { cnpj: string; senha: string };

  if (!cnpj || !senha) {
    return rep.status(400).send({ erro: 'CNPJ e senha são obrigatórios.' });
  }

  try {
    const { accessToken } = await autenticarUsuario(cnpj, senha);

    definirCookie(rep, 'authToken', accessToken, 3600);

    return rep.status(200).send({
      mensagem: 'Autenticação bem-sucedida.',
      autenticado: true,
    });
  } catch (error) {
    if (error instanceof CnpjNaoEncontradoError) {
      return rep.status(401).send({ erro: error.message, autenticado: false });
    }
    if (error instanceof SenhaInvalidaError) {
      return rep.status(401).send({ erro: error.message, autenticado: false });
    }
    return rep.status(500).send({
      erro: 'Erro interno ao autenticar o usuário.',
      autenticado: false,
    });
  }
}

/**
 * Controller para realizar logout.
 *
 * Remove os cookies de autenticação e encerra a sessão do usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 */
export async function logoutController(req: FastifyRequest, rep: FastifyReply) {
  try {
    rep.clearCookie('authToken'); // Remove o cookie de autenticação

    return rep.status(200).send({ mensagem: 'Logout realizado com sucesso.' });
  } catch (error) {
    return rep.status(500).send({ erro: 'Erro ao realizar logout.' });
  }
}