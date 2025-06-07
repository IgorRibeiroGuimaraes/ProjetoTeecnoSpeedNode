"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarCarta = verificarCarta;
exports.buscarStatusAberta = buscarStatusAberta;
exports.contarCartasAbertasPorCarta = contarCartasAbertasPorCarta;
exports.associarStatusAberta = associarStatusAberta;
const prisma_1 = require("../lib/prisma");
/**
 * Verifica se a carta existe no banco de dados.
 * @param cartaId ID da carta.
 * @returns A carta encontrada ou null.
 */
async function verificarCarta(cartaId) {
    return prisma_1.prisma.cartaVan.findUnique({
        where: { id: cartaId },
    });
}
/**
 * Busca o ID do status "aberta".
 * @returns O status "aberta" ou null.
 */
async function buscarStatusAberta() {
    return prisma_1.prisma.statusCarta.findUnique({
        where: { descricao: 'Aberta' },
    });
}
/**
 * Verifica o número de vezes que uma carta específica está com o status "aberta".
 * @param cartaId ID da carta.
 * @param statusId ID do status "aberta".
 * @returns O número de vezes que a carta está com o status "aberta".
 */
async function contarCartasAbertasPorCarta(cartaId, statusId) {
    return prisma_1.prisma.cartaStatus.count({
        where: {
            cartaId,
            statusId,
        },
    });
}
/**
 * Associa o status "aberta" a uma carta existente.
 * @param cartaId ID da carta.
 * @param statusId ID do status "aberta".
 */
async function associarStatusAberta(cartaId, statusId) {
    return prisma_1.prisma.cartaStatus.create({
        data: {
            cartaId,
            statusId,
        },
    });
}
