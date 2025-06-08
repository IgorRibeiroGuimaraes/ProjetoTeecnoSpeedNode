import { FastifyInstance } from "fastify";
import { getBancoConfiguracoesHandler } from "../controllers/getBancoConfiguracoesController";
import { bancoConfiguracoesSchema } from "../schemas/bank/bancos-configuracoes";

/**
 * Registra a rota de configurações bancárias.
 *
 * @param app - Instância do Fastify usada para registrar a rota.
 */
export async function bancoConfiguracoesRoutes(app: FastifyInstance) {
  app.get(
    "/bancos-configuracoes",
    {
      schema: bancoConfiguracoesSchema,
    },
    getBancoConfiguracoesHandler
  );
}