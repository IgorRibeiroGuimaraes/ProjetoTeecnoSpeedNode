"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarUsuario = autenticarUsuario;
exports.renovarAccessToken = renovarAccessToken;
const prisma_1 = require("../lib/prisma");
const jwtUtils_1 = require("../utils/jwtUtils");
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
    // Gera os tokens
    const accessToken = (0, jwtUtils_1.gerarTokenJWT)({ cnpj: empresa.cnpj, id: empresa.id });
    const refreshToken = (0, jwtUtils_1.gerarRefreshToken)({ cnpj: empresa.cnpj, id: empresa.id });
    return { accessToken, refreshToken };
}
async function renovarAccessToken(refreshToken) {
    try {
        // Valida o Refresh Token
        const payload = (0, jwtUtils_1.validarRefreshToken)(refreshToken);
        // Gera um novo Access Token
        const newAccessToken = (0, jwtUtils_1.gerarTokenJWT)({ cnpj: payload.cnpj, id: payload.id });
        return newAccessToken;
    }
    catch (error) {
        throw new Error('Refresh Token inválido ou expirado.');
    }
}
