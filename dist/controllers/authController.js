"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
exports.refreshTokenController = refreshTokenController;
const authService_1 = require("../services/authService");
const cookieUtils_1 = require("../utils/cookieUtils");
const errorHandler_1 = require("../utils/errorHandler");
/**
 * Controller para autenticar um usuário.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um token de acesso e define cookies para autenticação.
 */
async function loginController(req, rep) {
    const { cnpj, senha } = req.body;
    // Valida se os campos obrigatórios foram fornecidos
    if (!cnpj || !senha) {
        return rep.status(400).send({ erro: 'CNPJ e senha são obrigatórios.' });
    }
    try {
        // Chama o serviço para autenticar o usuário
        const { accessToken, refreshToken } = await (0, authService_1.autenticarUsuario)(cnpj, senha);
        // Define os cookies para Access Token e Refresh Token
        (0, cookieUtils_1.definirCookie)(rep, 'authToken', accessToken, 3600); // 1 hora
        (0, cookieUtils_1.definirCookie)(rep, 'refreshToken', refreshToken, 7 * 24 * 60 * 60); // 7 dias
        // Retorna a resposta de sucesso
        return rep.status(200).send({
            mensagem: 'Autenticação bem-sucedida.',
            token: accessToken,
        });
    }
    catch (error) {
        // Trata erros internos
        return (0, errorHandler_1.tratarErroInterno)(rep, error);
    }
}
/**
 * Controller para renovar o token de acesso.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna um novo token de acesso e redefine o cookie de autenticação.
 */
async function refreshTokenController(req, rep) {
    const refreshToken = req.cookies.refreshToken;
    // Valida se o refresh token foi fornecido
    if (!refreshToken) {
        return rep.status(401).send({ erro: 'Refresh token não fornecido.' });
    }
    try {
        // Chama o serviço para renovar o token de acesso
        const newAccessToken = await (0, authService_1.renovarAccessToken)(refreshToken);
        // Define o novo Access Token no cookie
        (0, cookieUtils_1.definirCookie)(rep, 'authToken', newAccessToken, 3600); // 1 hora
        // Retorna a resposta de sucesso
        return rep.status(200).send({
            mensagem: 'Token renovado com sucesso.',
            token: newAccessToken,
        });
    }
    catch (error) {
        // Trata erros internos
        return (0, errorHandler_1.tratarErroInterno)(rep, error);
    }
}
