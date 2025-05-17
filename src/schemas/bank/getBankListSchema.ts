export const getBankListSchema = {
  summary: 'Listar Bancos',
  description: 'Retorna uma lista de bancos disponíveis no sistema, ordenados pelo Id.',
  tags: ['Banco'],
  response: {
    200: {
      description: 'Lista de bancos retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'ID do banco' },
          nome: { type: 'string', description: 'Nome do banco' },
        },
        required: ['id', 'nome'],
      },
      example: [
        { id: 1, nome: 'Banco do Brasil S.A.' },
        { id: 2, nome: 'Itaú Unibanco S.A.' },
        { id: 3, nome: 'Banco Santander S.A.' },
        { id: 4, nome: 'Banco Inter S.A.' },
        { id: 5, nome: 'Caixa Econômica Federal' },
      ],
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        erro: { type: 'string', description: 'Mensagem de erro' },
        detalhe: { type: 'string', description: 'Detalhes do erro interno' },
      },
      example: {
        erro: 'Erro interno do servidor',
        detalhe: 'Erro inesperado ao processar a requisição.',
      },
    },
  },
};