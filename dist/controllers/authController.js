"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
exports.logoutController = logoutController;
const authService_1 = require("../services/authService");
const cookieUtils_1 = require("../utils/cookieUtils");
/**
 * Controller para autenticar um usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um token de acesso e define cookies para autenticação.
 */
async function loginController(req, rep) {
    const { cnpj, senha } = req.body;
    if (!cnpj || !senha) {
        return rep.status(400).send({ erro: 'CNPJ e senha são obrigatórios.' });
    }
    try {
        const { accessToken } = await (0, authService_1.autenticarUsuario)(cnpj, senha);
        (0, cookieUtils_1.definirCookie)(rep, 'authToken', accessToken, 3600); // Define o cookie com o token
        return rep.status(200).send({ mensagem: 'Autenticação bem-sucedida.', token: accessToken });
    }
    catch (error) {
        return rep.status(500).send({ erro: 'Erro interno ao autenticar o usuário.' });
    }
}
/**
 * Controller para realizar logout.
 *
 * Remove os cookies de autenticação e encerra a sessão do usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 */
async function logoutController(req, rep) {
    try {
        rep.clearCookie('authToken'); // Remove o cookie de autenticação
        return rep.status(200).send({ mensagem: 'Logout realizado com sucesso.' });
    }
    catch (error) {
        return rep.status(500).send({ erro: 'Erro ao realizar logout.' });
    }
}
