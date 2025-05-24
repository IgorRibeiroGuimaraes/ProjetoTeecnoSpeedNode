export const updateLetterServiceSchema = {
  description: 'Atualiza o serviço associado a uma carta.',
  tags: ['Carta VAN'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'ID da carta' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      servicoId: { type: 'number', description: 'ID do serviço' },
      servicoNome: { type: 'string', description: 'Nome do serviço' },
    },
    oneOf: [
      { required: ['servicoId'] },
      { required: ['servicoNome'] },
    ],
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
      },
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