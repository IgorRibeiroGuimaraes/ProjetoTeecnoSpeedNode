import { FastifyInstance } from "fastify";
import { getBancoConfiguracoesHandler } from "../controllers/getBancoConfiguracoesController";
import { bancoConfiguracoesSchema } from "../schemas/bank/bancos-configuracoes";
import { verificarAutenticacao } from "../middlewares/authMiddleware";

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