import { vanRequestExample } from '../../../fixtures/vanExamples';

/**
 * Esquema de validação do corpo da requisição para a criação de uma Carta VAN.
 * Este esquema define os campos obrigatórios e suas propriedades para garantir que a requisição
 * esteja no formato esperado antes de ser processada.
 */
export const vanBodySchema = {
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
  example: vanRequestExample,
};