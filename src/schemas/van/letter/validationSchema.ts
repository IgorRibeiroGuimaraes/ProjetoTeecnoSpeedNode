import { vanRequestExample } from '../../../fixtures/vanExamples';

/**
 * Esquema de validação do corpo da requisição para a criação de uma Carta VAN.
 * Este esquema define os campos obrigatórios e suas propriedades para garantir que a requisição
 * esteja no formato esperado antes de ser processada.
 */
export const vanBodySchema = {
  type: 'object', // Tipo do objeto esperado no corpo da requisição
  required: ['emitente', 'responsavel', 'banco'], // Campos obrigatórios no nível superior
  properties: {
    emitente: {
      type: 'object', // Tipo do campo emitente
      required: ['cnpj', 'razaoSocial'], // Campos obrigatórios do emitente
      properties: {
        cnpj: { type: 'string' }, // CNPJ do emitente
        razaoSocial: { type: 'string' }, // Razão social do emitente
      },
    },
    responsavel: {
      type: 'object', // Tipo do campo responsável
      required: ['nome', 'cargo', 'telefone', 'email'], // Campos obrigatórios do responsável
      properties: {
        nome: { type: 'string' }, // Nome do responsável
        cargo: { type: 'string' }, // Cargo do responsável
        telefone: { type: 'string' }, // Telefone do responsável
        email: { type: 'string' }, // E-mail do responsável
      },
    },
    banco: {
      type: 'object', // Tipo do campo banco
      required: [
        'bancoId',
        'agencia',
        'agenciaDV',
        'conta',
        'contaDV',
        'convenio',
        'tipoCnabId',
        'gerente',
      ], // Campos obrigatórios do banco
      properties: {
        bancoId: { type: 'number' }, // ID do banco
        agencia: { type: 'string' }, // Agência do banco
        agenciaDV: { type: 'string' }, // Dígito verificador da agência
        conta: { type: 'number' }, // Número da conta
        contaDV: { type: 'number' }, // Dígito verificador da conta
        convenio: { type: 'string' }, // Número do convênio
        tipoCnabId: { type: 'number' }, // ID do tipo de CNAB
        gerente: {
          type: 'object', // Tipo do campo gerente
          required: ['nome', 'telefone', 'email'], // Campos obrigatórios do gerente
          properties: {
            nome: { type: 'string' }, // Nome do gerente
            telefone: { type: 'string' }, // Telefone do gerente
            email: { type: 'string' }, // E-mail do gerente
          },
        },
      },
    },
  },
  example: vanRequestExample, // Exemplo de uma requisição válida
};