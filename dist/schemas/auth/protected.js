"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedSchema = void 0;
exports.protectedSchema = {
    tags: ['Autenticação'],
    summary: 'Rota protegida',
    description: 'Exemplo de rota protegida que exige autenticação via token JWT.',
    response: {
        200: {
            description: 'Usuário autenticado com sucesso.',
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Você está autenticado!' },
            },
        },
        401: {
            description: 'Sessão expirada ou token inválido.',
            type: 'object',
            properties: {
                erro: { type: 'string', example: 'Sessão expirada. Faça login novamente.' },
            },
        },
    },
};
