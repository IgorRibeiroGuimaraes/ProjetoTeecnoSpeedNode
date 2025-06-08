"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarUsuario = autenticarUsuario;
const prisma_1 = require("../lib/prisma");
const jwtUtils_1 = require("../utils/jwtUtils");
/**
 * Serviço para autenticar o usuário.
 *
 * @param cnpj - CNPJ da empresa.
 * @param senha - Senha da empresa.
 * @returns Objeto contendo o Access Token.
 */
async function autenticarUsuario(cnpj, senha) {
    // Busca a empresa pelo CNPJ
    const empresa = await prisma_1.prisma.empresa.findUnique({ where: { cnpj } });
    if (!empresa) {
        throw new Error('CNPJ não encontrado no sistema.');
    }
    // Valida a senha
    if (empresa.senha !== senha) {
        throw new Error('Senha inválida para o CNPJ fornecido.');
    }
    // Gera o Access Token
    const accessToken = (0, jwtUtils_1.gerarTokenJWT)({ cnpj: empresa.cnpj, id: empresa.id });
    return { accessToken };
}
