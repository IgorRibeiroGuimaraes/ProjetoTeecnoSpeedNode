"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllServices = getAllServices;
const prisma_1 = require("../lib/prisma");
/**
 * Serviço para buscar todos os serviços cadastrados.
 *
 * Este serviço consulta o banco de dados para obter a lista de todos os serviços disponíveis.
 * Caso ocorra algum erro durante a consulta, ele lança uma exceção para ser tratada no controller.
 *
 * @returns Retorna uma lista de serviços cadastrados no banco de dados.
 * @throws Lança um erro caso ocorra algum problema durante a consulta.
 */
async function getAllServices() {
    try {
        return await prisma_1.prisma.servico.findMany();
    }
    catch (error) {
        console.error('Erro ao consultar serviços:', error);
        throw new Error('Erro ao consultar os serviços.');
    }
}
