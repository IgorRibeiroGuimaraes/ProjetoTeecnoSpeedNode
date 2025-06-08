"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarTokenJWT = gerarTokenJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Gera um token JWT.
 *
 * @param payload - Dados a serem incluídos no token.
 * @returns Token JWT.
 */
function gerarTokenJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expira em 20 segundos
}
