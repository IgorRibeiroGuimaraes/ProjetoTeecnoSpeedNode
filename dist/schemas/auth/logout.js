"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = void 0;
exports.logoutSchema = {
    tags: ['Autenticação'],
    summary: 'Realizar logout',
    description: 'Remove os cookies de autenticação e encerra a sessão do usuário.',
    response: {
        200: {
            description: 'Logout realizado com sucesso.',
            type: 'object',
            properties: {
                mensagem: { type: 'string', example: 'Logout realizado com sucesso.' },
            },
        },
        500: {
            description: 'Erro ao realizar logout.',
            type: 'object',
            properties: {
                erro: { type: 'string', example: 'Erro ao realizar logout.' },
            },
        },
    },
};
