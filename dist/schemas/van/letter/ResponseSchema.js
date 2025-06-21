"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanResponseSchema = void 0;
const vanExamples_1 = require("../../../fixtures/vanExamples");
/**
 * Esquema de resposta para a rota de criação de uma Carta VAN.
 * Este esquema define os formatos de resposta esperados para os diferentes códigos de status HTTP.
 */
exports.vanResponseSchema = {
    /**
     * Resposta 201 - Sucesso na criação da Carta VAN.
     * Esta resposta é retornada quando a Carta VAN é criada com sucesso no sistema.
     */
    201: {
        description: 'Carta VAN criada com sucesso', // Descrição da resposta
        type: 'object', // Tipo do objeto retornado
        properties: {
            emitente: {
                type: 'object',
                properties: {
                    cnpj: { type: 'string' }, // CNPJ do emitente
                    razaoSocial: { type: 'string' }, // Razão social do emitente
                },
            },
            responsavel: {
                type: 'object',
                properties: {
                    nome: { type: 'string' }, // Nome do responsável
                    cargo: { type: 'string' }, // Cargo do responsável
                    telefone: { type: 'string' }, // Telefone do responsável
                    email: { type: 'string' }, // E-mail do responsável
                },
            },
            banco: {
                type: 'object',
                properties: {
                    bancoId: { type: 'number' }, // ID do banco
                    agencia: { type: 'string' }, // Agência do banco
                    agenciaDV: { type: 'string' }, // Dígito verificador da agência
                    conta: { type: 'number' }, // Número da conta
                    contaDV: { type: 'number' }, // Dígito verificador da conta
                    convenio: { type: 'string' }, // Número do convênio
                    cnab: { type: 'string' }, // Nome do tipo de CNAB
                    gerente: {
                        type: 'object',
                        properties: {
                            nome: { type: 'string' }, // Nome do gerente
                            telefone: { type: 'string' }, // Telefone do gerente
                            email: { type: 'string' }, // E-mail do gerente
                        },
                    },
                },
            },
            produto: {
                type: 'object',
                properties: {
                    id: { type: 'number' }, // ID do produto
                    nome: { type: 'string' }, // Nome do produto
                    descricao: { type: 'string' }, // Descrição do produto
                },
            },
            createdAt: { type: 'string', format: 'date-time' }, // Data e hora de criação da carta
        },
        example: vanExamples_1.vanResponseExample, // Exemplo de resposta bem-sucedida
    },
    /**
     * Resposta 400 - Erro de validação.
     * Esta resposta é retornada quando há erros de validação no corpo da requisição.
     */
    400: {
        description: 'Erro de validação ou bancoId inválido', // Descrição do erro
        type: 'object', // Tipo do objeto retornado
        properties: {
            erro: { type: 'string' }, // Mensagem geral de erro
            campos: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        campo: { type: 'string' }, // Nome do campo com erro
                        mensagem: { type: 'string' }, // Mensagem de erro
                    },
                },
            },
        },
        example: vanExamples_1.vanErrorValidationExample, // Exemplo de erro de validação
    },
    /**
     * Resposta 500 - Erro interno do servidor.
     * Esta resposta é retornada quando ocorre um erro inesperado no servidor.
     */
    500: {
        description: 'Erro interno do servidor', // Descrição do erro
        type: 'object', // Tipo do objeto retornado
        properties: {
            erro: { type: 'string' }, // Mensagem geral de erro
            detalhe: { type: 'string' }, // Detalhe do erro interno
        },
        example: vanExamples_1.vanErrorInternalExample, // Exemplo de erro interno
    },
};
