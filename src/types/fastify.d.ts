import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      cnpj: string;
      exp: number;
      iat: number;
    };
  }
}