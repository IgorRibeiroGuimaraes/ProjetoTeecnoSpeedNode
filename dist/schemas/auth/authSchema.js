"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
exports.loginSchema = {
    tags: ['Autenticação'],
    summary: 'Realizar login',
    description: 'Autentica o usuário e retorna o status da autenticação.',
    body: {
        type: 'object',
        properties: {
            cnpj: {
                type: 'string',
                description: 'CNPJ da empresa',
                example: '12345678000199'
            },
            senha: {
                type: 'string',
                description: 'Senha do usuário',
                example: 'senha123'
            },
        },
        required: ['cnpj', 'senha'],
    },
    response: {
        200: {
            description: 'Login realizado com sucesso.',
            type: 'object',
            properties: {
                mensagem: {
                    type: 'string',
                    example: 'Autenticação bem-sucedida.'
                },
                autenticado: {
                    type: 'boolean',
                    example: true
                }
            }
        },
        400: {
            description: 'Erro de validação.',
            type: 'object',
            properties: {
                erro: {
                    type: 'string',
                    example: 'CNPJ e senha são obrigatórios.'
                }
            }
        },
        500: {
            description: 'Erro interno.',
            type: 'object',
            properties: {
                erro: {
                    type: 'string',
                    example: 'Erro interno ao autenticar o usuário.'
                },
                autenticado: {
                    type: 'boolean',
                    example: false
                }
            }
        }
    }
};
