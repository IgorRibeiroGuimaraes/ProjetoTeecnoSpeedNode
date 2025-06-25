export const bancoConfiguracoesSchema = {
  tags: ['Configurações Bancárias'],
  summary: 'Obter configurações bancárias',
  description: 'Retorna uma lista de configurações bancárias disponíveis no sistema.',
  response: {
    200: {
      description: 'Configurações bancárias obtidas com sucesso.',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          BancoId: { type: 'number', description: 'ID do banco', example: 1 },
          BancoNome: { type: 'string', description: 'Nome do banco', example: 'Banco do Brasil S.A.' },
          Cnab: {
            type: 'array',
            description: 'Lista de tipos CNAB suportados pelo banco',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'ID do tipo CNAB', example: 1 },
                Tipo: { type: 'string', description: 'Tipo CNAB', example: '240' },
              },
            },
          },
          Produto: {
            type: 'array',
            description: 'Lista de produtos suportados pelo banco',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'ID do produto', example: 1 },
                Nome: { type: 'string', description: 'Nome do produto', example: 'Boletos' },
                descricao: { type: 'string', description: 'Descrição do produto', example: 'Trafegar arquivos de remessa e retorno de boletos' },
              },
            },
          },
        },
      },
    },
    500: {
      description: 'Erro ao obter configurações bancárias.',
      type: 'object',
      properties: {
        erro: { type: 'string', example: 'Erro interno ao buscar configurações bancárias.' },
      },
    },
  },
};