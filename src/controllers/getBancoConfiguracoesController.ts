import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

/**
 * Handler para buscar as configurações de bancos.
 * Este handler é responsável por:
 * 1. Buscar todas as configurações de bancos, incluindo CNABs e Produtos.
 * 2. Formatar os dados para um JSON estruturado.
 * 3. Retornar os dados formatados ou uma mensagem de erro.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
export async function getBancoConfiguracoesHandler(req: FastifyRequest, rep: FastifyReply) {
  try {
    // Busca todas as configurações de bancos, incluindo CNABs e Produtos
    const configuracoes = await prisma.banco.findMany({
      include: {
        configuracoes: {
          include: {
            tipoCnab: true,
            produto: true,
          },
        },
      },
    });

    // Formata os dados para o JSON estruturado
    const resposta = configuracoes.map((banco) => ({
      BancoId: banco.id,
      BancoNome: banco.nome,
      Cnab: banco.configuracoes
        .filter((config) => config.tipoCnab)
        .map((config) => ({
          id: config.tipoCnab?.id,
          Tipo: config.tipoCnab?.descricao,
        })),
      Produto: banco.configuracoes
        .filter((config) => config.produto)
        .map((config) => ({
          id: config.produto?.id,
          Nome: config.produto?.nome,
          descricao: config.produto?.descricao,
        })),
    }));

    return rep.status(200).send(resposta);
  } catch (error) {
    console.error("Erro ao buscar configurações de bancos:", error);
    return rep.status(500).send({ erro: "Erro ao buscar configurações de bancos" });
  }
}