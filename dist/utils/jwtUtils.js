"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarTokenJWT = gerarTokenJWT;
exports.gerarRefreshToken = gerarRefreshToken;
exports.validarRefreshToken = validarRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-jwt';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'seu-segredo-refresh';
/**
 * Gera um Access Token (JWT) com expiração curta (1 hora).
 */
function gerarTokenJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}
/**
 * Gera um Refresh Token com expiração longa (7 dias).
 */
function gerarRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}
/**
 * Valida um Refresh Token.
 */
function validarRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
}
