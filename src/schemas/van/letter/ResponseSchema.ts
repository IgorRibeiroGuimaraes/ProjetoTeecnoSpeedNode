import {
  vanResponseExample,
  vanErrorValidationExample,
  vanErrorInternalExample,
} from '../../../fixtures/vanExamples'

/**
 * Esquema de resposta para a rota de criação de uma Carta VAN.
 * Este esquema define os formatos de resposta esperados para os diferentes códigos de status HTTP.
 */
export const vanResponseSchema = {
  /**
   * Resposta 201 - Sucesso na criação da Carta VAN.
   * Esta resposta é retornada quando a Carta VAN é criada com sucesso no sistema.
   */
  201: {
    description: 'Carta VAN criada com sucesso', // Descrição da resposta
    type: 'object', // Tipo do objeto retornado
    properties: {
      id: { type: 'number' }, // ID da carta criada
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
      responsavelTecnoSpeed: { // Adicionado bloco responsavelTecnoSpeed
        type: 'object',
        properties: {
          respTecno: { type: 'string', description: 'Responsável TecnoSpeed' },
          emailTecno: { type: 'string', description: 'E-mail do responsável TecnoSpeed' },
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
          cidadebanco: { type: 'string' }, // Cidade da agência bancária
          ufBanco: { type: 'string' }, // UF da agência bancária
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
          preferenciaContato: {
            type: 'string',
            description: 'Preferência de contato do banco',
            example: 'E-mail'
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
    example: vanResponseExample, // Exemplo de resposta bem-sucedida
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
    example: vanErrorValidationExample, // Exemplo de erro de validação
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
    example: vanErrorInternalExample, // Exemplo de erro interno
  },
};