import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { logoutController } from '../controllers/authController';

/**
 * Middleware para verificar a validade do token.
 * Caso o token esteja expirado ou inválido, força o logout do usuário e retorna o erro apropriado.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 */
export async function verificarAutenticacao(req: FastifyRequest, rep: FastifyReply) {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return rep.status(401).send({ erro: 'Usuário não autenticado. Token não encontrado.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as {
      exp: number;
      id: number;
      cnpj: string;
      iat: number;
    };

    const agora = Math.floor(Date.now() / 1000);

    if (decoded.exp < agora) {
      await logoutController(req, rep);
      return rep.status(401).send({ erro: 'Sessão expirada. Faça login novamente.' });
    }

    // Adiciona os dados do usuário decodificados à requisição
    req.user = decoded; // Agora `user` está disponível no tipo `FastifyRequest`
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      await logoutController(req, rep);
      return rep.status(401).send({ erro: 'Sessão expirada. Faça login novamente.' });
    }

    return rep.status(401).send({ erro: 'Token inválido. Verifique suas credenciais.' });
  }
}