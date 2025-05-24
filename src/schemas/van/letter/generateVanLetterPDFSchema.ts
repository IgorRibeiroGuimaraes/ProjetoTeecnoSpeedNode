export const generateVanLetterPDFSchema = {
  description: 'Gera um PDF para uma Van Letter com base no serviço associado.',
  tags: ['Carta VAN'],
  summary: 'Gerar PDF da Carta VAN',
  body: {
    type: 'object',
    properties: {
      cartaId: { type: 'number', description: 'ID da carta' },
    },
    required: ['cartaId'],
  },
  response: {
    200: {
      description: 'PDF gerado com sucesso',
      type: 'string',
      format: 'binary',
    },
    400: {
      description: 'Erro de validação ou serviço não definido',
      type: 'object',
      properties: {
        erro: { type: 'string' },
      },
    },
    404: {
      description: 'Carta não encontrada',
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