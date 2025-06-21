"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenhaInvalidaError = exports.CnpjNaoEncontradoError = void 0;
class CnpjNaoEncontradoError extends Error {
    constructor(message = 'CNPJ não encontrado no sistema.') {
        super(message);
        this.name = 'CnpjNaoEncontradoError';
    }
}
exports.CnpjNaoEncontradoError = CnpjNaoEncontradoError;
class SenhaInvalidaError extends Error {
    constructor(message = 'Senha inválida para o CNPJ fornecido.') {
        super(message);
        this.name = 'SenhaInvalidaError';
    }
}
exports.SenhaInvalidaError = SenhaInvalidaError;
