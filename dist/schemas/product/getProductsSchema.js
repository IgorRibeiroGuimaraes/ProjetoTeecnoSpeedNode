"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsSchema = void 0;
const productExamples_1 = require("../../fixtures/productExamples");
exports.getProductsSchema = {
    summary: 'Obter Produtos por Banco',
    description: 'Retorna o nome do banco e os produtos disponíveis para o banco especificado pelo Banco Id.',
    tags: ['Produtos'],
    params: {
        type: 'object',
        properties: {
            bancoId: { type: 'number', description: 'ID do banco' },
        },
        required: ['bancoId'],
    },
    response: {
        200: {
            description: 'Nome do banco e lista de produtos disponíveis',
            type: 'object',
            properties: {
                bancoId: { type: 'number', description: 'ID do banco' },
                nomeBanco: { type: 'string', description: 'Nome do banco' },
                produtosDisponiveis: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'ID do produto' },
                            nome: { type: 'string', description: 'Nome do produto' },
                            descricao: { type: 'string', description: 'Descrição do produto' },
                        },
                    },
                },
            },
            example: productExamples_1.getProductsSuccessExample,
        },
        404: {
            description: 'Banco não encontrado ou sem produtos disponíveis',
            type: 'object',
            properties: {
                erro: { type: 'string', description: 'Mensagem de erro' },
                detalhe: { type: 'string', description: 'Detalhes do erro' },
            },
            example: productExamples_1.getProductsNotFoundExample,
        },
        500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
                erro: { type: 'string', description: 'Mensagem de erro' },
                detalhe: { type: 'string', description: 'Detalhes do erro interno' },
            },
            example: productExamples_1.getProductsInternalErrorExample,
        },
    },
};
