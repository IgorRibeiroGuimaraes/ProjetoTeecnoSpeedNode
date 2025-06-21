"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listcnpjletterschema = void 0;
exports.listcnpjletterschema = {
    summary: 'Listar serviços por CNPJ',
    description: 'Retorna a lista de cartas, através do CNPJ, Requer autenticação.',
    tags: ['Carta VAN'],
    querystring: {
        type: 'object',
        properties: {
            cnpj: {
                type: 'string',
                description: 'CNPJ para filtrar as cartas (somente números, Obrigatório)',
                example: '12345678000199'
            }
        }
    },
    response: {
        200: {
            description: 'Lista de Carta encontrados',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '1' },
                    nome: { type: 'string', example: 'Envio de boletos' },
                    tipoCnab: { type: 'string', example: 'CNAB240' },
                    produto: { type: 'string', example: 'Cobrança' },
                    banco: { type: 'string', example: 'Itaú' },
                }
            }
        },
        401: {
            description: 'Não autenticado',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Token inválido ou ausente.' }
            }
        },
        500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Erro ao buscar serviços.' }
            }
        }
    }
};
