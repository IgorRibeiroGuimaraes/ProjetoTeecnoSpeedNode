"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankListService = getBankListService;
const prisma_1 = require("../lib/prisma");
/**
 * Serviço para buscar a lista de bancos no banco de dados.
 *
 * @returns Lista de bancos ordenada alfabeticamente.
 */
async function getBankListService() {
    return await prisma_1.prisma.banco.findMany({
        select: {
            id: true,
            nome: true, // Nome do banco
        },
        orderBy: {
            id: 'asc', // Ordena os bancos em ordem alfabética
        },
    });
}
