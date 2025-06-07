"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesSchema = void 0;
exports.getServicesSchema = {
    description: 'Retorna todos os serviços cadastrados no banco de dados.',
    tags: ['Serviços'],
    response: {
        200: {
            description: 'Lista de serviços',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', description: 'ID do serviço' },
                    nome: { type: 'string', description: 'Nome do serviço' },
                },
            },
        },
        500: {
            description: 'Erro ao consultar os serviços',
            type: 'object',
            properties: {
                erro: { type: 'string' },
            },
        },
    },
};
