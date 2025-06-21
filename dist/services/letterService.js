"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServicoById = findServicoById;
exports.updateCartaServico = updateCartaServico;
const prisma_1 = require("../lib/prisma");
/**
 * Serviço para buscar um serviço pelo ID.
 *
 * @param servicoId - ID do serviço a ser buscado.
 * @returns Retorna os dados do serviço ou `null` se não encontrado.
 */
async function findServicoById(servicoId) {
    return await prisma_1.prisma.servico.findUnique({ where: { id: servicoId } });
}
/**
 * Serviço para atualizar o serviço associado a uma carta.
 *
 * Este serviço recebe um objeto contendo o ID da carta e o ID do serviço a ser associado.
 *
 * @param data - Objeto contendo cartaId e servicoId.
 * @returns Retorna os dados da carta atualizada.
 */
async function updateCartaServico(data) {
    const { cartaId, servicoId } = data;
    return await prisma_1.prisma.cartaVan.update({
        where: { id: cartaId },
        data: { servicoId },
    });
}
