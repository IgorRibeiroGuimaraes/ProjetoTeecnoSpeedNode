import { FastifyInstance } from "fastify";
import { getBancoConfiguracoesHandler } from "../controllers/getBancoConfiguracoesController";
import { bancoConfiguracoesSchema } from "../schemas/bank/bancos-configuracoes";
import { verificarAutenticacao } from "../middlewares/authMiddleware";

/**
 * Registra a rota de configurações bancárias.
 *
 * @param app - Instância do Fastify usada para registrar a rota.
 */
export async function bancoConfiguracoesRoutes(app: FastifyInstance) {
  app.get(
    "/bancos-configuracoes",
    {
      preHandler: verificarAutenticacao,
      schema: bancoConfiguracoesSchema,
    },
    getBancoConfiguracoesHandler
  );
}