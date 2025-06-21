"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarAutenticacao = verificarAutenticacao;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = require("../controllers/authController");
/**
 * Middleware para verificar a validade do token.
 * Caso o token esteja expirado ou inválido, força o logout do usuário e retorna o erro apropriado.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 */
async function verificarAutenticacao(req, rep) {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return rep.status(401).send({ erro: 'Usuário não autenticado. Token não encontrado.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        const agora = Math.floor(Date.now() / 1000);
        if (decoded.exp < agora) {
            await (0, authController_1.logoutController)(req, rep);
            return rep.status(401).send({ erro: 'Sessão expirada. Faça login novamente.' });
        }
        // Adiciona os dados do usuário decodificados à requisição
        req.user = decoded; // Agora `user` está disponível no tipo `FastifyRequest`
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            await (0, authController_1.logoutController)(req, rep);
            return rep.status(401).send({ erro: 'Sessão expirada. Faça login novamente.' });
        }
        return rep.status(401).send({ erro: 'Token inválido. Verifique suas credenciais.' });
    }
}
