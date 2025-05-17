import {
  getProductsSuccessExample,
  getProductsNotFoundExample,
  getProductsInternalErrorExample,
} from '../../fixtures/productExamples';

export const getProductsSchema = {
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
      example: getProductsSuccessExample,
    },
    404: {
      description: 'Banco não encontrado ou sem produtos disponíveis',
      type: 'object',
      properties: {
        erro: { type: 'string', description: 'Mensagem de erro' },
        detalhe: { type: 'string', description: 'Detalhes do erro' },
      },
      example: getProductsNotFoundExample,
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        erro: { type: 'string', description: 'Mensagem de erro' },
        detalhe: { type: 'string', description: 'Detalhes do erro interno' },
      },
      example: getProductsInternalErrorExample,
    },
  },
};