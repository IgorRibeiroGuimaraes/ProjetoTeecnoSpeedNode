import {
  updateVanLetterSuccessExample,
  updateVanLetterNotFoundExample,
  updateVanLetterInternalErrorExample,
} from '../../../fixtures/updateVanExample';

export const updateVanLetterSchema = {
  summary: 'Atualizar Carta VAN',
  description: 'Atualiza campos específicos de uma carta VAN existente, mantendo a estrutura hierárquica.',
  tags: ['Carta VAN'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'ID da carta VAN' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      emitente: {
        type: 'object',
        properties: {
          cnpj: { type: 'string', description: 'CNPJ do emitente' },
          razaoSocial: { type: 'string', description: 'Razão social do emitente' },
        },
        additionalProperties: false,
      },
      responsavel: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: 'Nome do responsável' },
          cargo: { type: 'string', description: 'Cargo do responsável' },
          telefone: { type: 'string', description: 'Telefone do responsável' },
          email: { type: 'string', description: 'E-mail do responsável' },
        },
        additionalProperties: false,
      },
      banco: {
        type: 'object',
        properties: {
          bancoId: { type: 'number', description: 'ID do banco' },
          agencia: { type: 'string', description: 'Agência bancária' },
          agenciaDV: { type: 'string', description: 'Dígito verificador da agência' },
          conta: { type: 'number', description: 'Número da conta' },
          contaDV: { type: 'number', description: 'Dígito verificador da conta' },
          convenio: { type: 'string', description: 'Número do convênio' },
          tipoCnabId: { type: 'number', description: 'ID do tipo CNAB' },
          gerente: {
            type: 'object',
            properties: {
              nome: { type: 'string', description: 'Nome do gerente' },
              telefone: { type: 'string', description: 'Telefone do gerente' },
              email: { type: 'string', description: 'E-mail do gerente' },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false, // Garante que apenas os campos definidos sejam aceitos
  },
  response: {
    200: {
      description: 'Carta VAN atualizada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number', description: 'ID da carta VAN' },
        camposAlterados: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              campo: { type: 'string', description: 'Nome do campo alterado' },
              valor: { type: 'string', description: 'Valor recebido para o campo' },
            },
          },
        },
      },
      example: updateVanLetterSuccessExample,
    },
    404: {
      description: 'Carta VAN não encontrada',
      type: 'object',
      properties: {
        erro: { type: 'string', description: 'Mensagem de erro' },
        detalhe: { type: 'string', description: 'Detalhes do erro' },
      },
      example: updateVanLetterNotFoundExample,
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        erro: { type: 'string', description: 'Mensagem de erro' },
        detalhe: { type: 'string', description: 'Detalhes do erro interno' },
      },
      example: updateVanLetterInternalErrorExample,
    },
  },
};