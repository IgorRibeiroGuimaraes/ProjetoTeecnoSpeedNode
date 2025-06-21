"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanSchema = exports.vanBodySchema = void 0;
const vanExamples_1 = require("../../../fixtures/vanExamples");
const ResponseSchema_1 = require("./ResponseSchema");
/**
 * Esquema de validação do corpo da requisição para a criação de uma Carta VAN.
 * Este esquema define os campos obrigatórios e suas propriedades para garantir que a requisição
 * esteja no formato esperado antes de ser processada.
 */
exports.vanBodySchema = {
    type: 'object',
    required: ['emitente', 'responsavel', 'banco', 'produtoId'], // Adicionado 'produtoId' como obrigatório
    properties: {
        emitente: {
            type: 'object',
            required: ['cnpj', 'razaoSocial'],
            properties: {
                cnpj: { type: 'string' },
                razaoSocial: { type: 'string' },
            },
        },
        responsavel: {
            type: 'object',
            required: ['nome', 'cargo', 'telefone', 'email'],
            properties: {
                nome: { type: 'string' },
                cargo: { type: 'string' },
                telefone: { type: 'string' },
                email: { type: 'string' },
            },
        },
        banco: {
            type: 'object',
            required: [
                'bancoId',
                'agencia',
                'agenciaDV',
                'conta',
                'contaDV',
                'convenio',
                'tipoCnabId',
                'gerente',
            ],
            properties: {
                bancoId: { type: 'number' },
                agencia: { type: 'string' },
                agenciaDV: { type: 'string' },
                conta: { type: 'number' },
                contaDV: { type: 'number' },
                convenio: { type: 'string' },
                tipoCnabId: { type: 'number' },
                gerente: {
                    type: 'object',
                    required: ['nome', 'telefone', 'email'],
                    properties: {
                        nome: { type: 'string' },
                        telefone: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
            },
        },
        produtoId: {
            type: 'number',
            description: 'ID do produto relacionado à Carta VAN',
            example: 1,
        },
    },
    example: vanExamples_1.vanRequestExample,
};
exports.vanSchema = {
    tags: ['Carta VAN'], // Tag para categorizar a rota na documentação
    summary: 'Criar Carta VAN', // Resumo da funcionalidade da rota
    description: 'Esta rota é utilizada para criar uma nova Carta VAN, um documento necessário para formalizar a autorização entre o cliente e a Software House junto ao banco.\n\n' +
        'A requisição deve conter informações do emitente, do responsável, do banco e do gerente responsável.\n' +
        'Todos os dados são validados antes de serem armazenados e, em caso de sucesso, a carta é registrada no sistema com a data e hora da criação.\n\n' +
        'Essa rota é ideal para ser utilizada em sistemas administrativos ou portais internos que precisem gerar este documento para posterior assinatura e envio ao banco.',
    body: exports.vanBodySchema, // Referência ao esquema do corpo
    response: ResponseSchema_1.vanResponseSchema
};
