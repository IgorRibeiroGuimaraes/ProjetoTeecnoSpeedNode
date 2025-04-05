export const vanResponseSchema = {
  201: {
    description: 'Carta VAN criada com sucesso',
    type: 'object',
    properties: {
      id: { type: 'number' },
      cnpjSoftwareHouse: { type: 'string' },
      cnpjEmitente: { type: 'string' },
      razaoSocial: { type: 'string' },
      nomeResponsavel: { type: 'string' },
      cargoResponsavel: { type: 'string' },
      telefone: { type: 'string' },
      email: { type: 'string' },
      bancoId: { type: 'number' },
      agencia: { type: 'string' },
      agenciaDV: { type: 'string' },
      conta: { type: 'number' },
      contaDV: { type: 'number' },
      convenio: { type: 'string' },
      cnab: { type: 'string' },
      nomeGerente: { type: 'string' },
      telefoneGerente: { type: 'string' },
      emailGerente: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  },
  400: {
    description: 'Erro de validação ou bancoId inválido',
    type: 'object',
    properties: {
      erro: { type: 'string' },
      campos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            campo: { type: 'string' },
            mensagem: { type: 'string' }
          }
        }
      }
    }
  },
  500: {
    description: 'Erro interno do servidor',
    type: 'object',
    properties: {
      erro: { type: 'string' },
      detalhe: { type: 'string' }
    }
  }
};
