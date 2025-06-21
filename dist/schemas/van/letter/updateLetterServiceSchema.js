"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAndGenearateLetterServicPDFSchema = void 0;
exports.updateAndGenearateLetterServicPDFSchema = {
    description: 'Atualiza o serviço de uma carta e gera um PDF assinado',
    tags: ['Carta VAN'],
    body: {
        type: 'object',
        properties: {
            cartaId: { type: 'number', description: 'ID da carta' },
            servicoId: { type: 'number', description: 'ID do serviço' },
        },
        required: ['cartaId', 'servicoId'],
    },
    response: {
        200: {
            description: 'Serviço atualizado com sucesso',
            type: 'object',
            properties: {
                mensagem: { type: 'string' },
                carta: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        servicoId: { type: 'number' },
                    },
                },
                pdfUrl: { type: 'string', description: 'URL assinada do PDF gerado' },
            },
            required: ['mensagem', 'carta', 'pdfUrl'],
        },
        400: {
            description: 'Erro de validação',
            type: 'object',
            properties: {
                erro: { type: 'string' },
            },
        },
        404: {
            description: 'Serviço não encontrado',
            type: 'object',
            properties: {
                erro: { type: 'string' },
            },
        },
        500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
                erro: { type: 'string' },
            },
        },
    },
};
