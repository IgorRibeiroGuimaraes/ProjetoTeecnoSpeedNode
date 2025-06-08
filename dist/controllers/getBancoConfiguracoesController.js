"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBancoConfiguracoesHandler = getBancoConfiguracoesHandler;
const prisma_1 = require("../lib/prisma");
async function getBancoConfiguracoesHandler(req, rep) {
    try {
        // Busca todas as configurações de bancos, incluindo CNABs e Produtos
        const configuracoes = await prisma_1.prisma.banco.findMany({
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
    }
    catch (error) {
        console.error("Erro ao buscar configurações de bancos:", error);
        return rep.status(500).send({ erro: "Erro ao buscar configurações de bancos" });
    }
}
