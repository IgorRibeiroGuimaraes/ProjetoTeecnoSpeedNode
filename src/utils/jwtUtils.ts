import jwt from 'jsonwebtoken';

/**
 * Gera um token JWT.
 *
 * @param payload - Dados a serem incluídos no token.
 * @returns Token JWT.
 */
export function gerarTokenJWT(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Expira em 20 segundos
}