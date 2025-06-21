"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarCartaPorCnpjService = buscarCartaPorCnpjService;
const prisma_1 = require("../lib/prisma");
async function buscarCartaPorCnpjService(cnpj) {
    const carta = await prisma_1.prisma.cartaVan.findFirst({
        where: { cnpjEmitente: cnpj, servicoId: { not: null } },
        include: {
            produto: true,
            servico: true,
            tipoCnab: true,
            banco: true,
        },
        orderBy: { createdAt: 'desc' } // Busca a carta mais recente
    });
    if (!carta)
        return null;
    return {
        id: carta.id,
        dataCriacao: carta.createdAt,
        produto: carta.produto.nome,
        servicoNome: carta.servico?.nome,
        createdAt: carta.createdAt,
        tipoCnab: carta.tipoCnab?.descricao,
        banco: carta.banco?.nome,
    };
}
