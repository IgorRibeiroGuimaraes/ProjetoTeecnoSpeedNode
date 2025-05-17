import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-jwt';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'seu-segredo-refresh';

/**
 * Gera um Access Token (JWT) com expiração curta (1 hora).
 */
export function gerarTokenJWT(payload: { cnpj: string; id: number }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

/**
 * Gera um Refresh Token com expiração longa (7 dias).
 */
export function gerarRefreshToken(payload: { cnpj: string; id: number }): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

/**
 * Valida um Refresh Token.
 */
export function validarRefreshToken(token: string): { cnpj: string; id: number } {
  return jwt.verify(token, REFRESH_SECRET) as { cnpj: string; id: number };
}