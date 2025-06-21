"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenhaInvalidaError = exports.CnpjNaoEncontradoError = void 0;
exports.autenticarUsuario = autenticarUsuario;
const authErrors_1 = require("../errors/authErrors");
Object.defineProperty(exports, "CnpjNaoEncontradoError", { enumerable: true, get: function () { return authErrors_1.CnpjNaoEncontradoError; } });
Object.defineProperty(exports, "SenhaInvalidaError", { enumerable: true, get: function () { return authErrors_1.SenhaInvalidaError; } });
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
    const empresa = await prisma_1.prisma.empresa.findUnique({ where: { cnpj } });
    if (!empresa) {
        throw new authErrors_1.CnpjNaoEncontradoError();
    }
    if (empresa.senha !== senha) {
        throw new authErrors_1.SenhaInvalidaError();
    }
    const accessToken = (0, jwtUtils_1.gerarTokenJWT)({ cnpj: empresa.cnpj, id: empresa.id });
    return { accessToken };
}
