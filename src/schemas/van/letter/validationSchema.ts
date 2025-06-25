import { vanResponseSchema } from './ResponseSchema';

/**
 * Esquema de validação do corpo da requisição para a criação de uma Carta VAN.
 * Define os campos obrigatórios e exemplos para documentação Swagger.
 */
export const vanBodySchema = {
  type: 'object',
  required: ['emitente', 'responsavel', 'responsavelTecnoSpeed', 'banco', 'produtoId'],
  properties: {
    emitente: {
      type: 'object',
      required: ['cnpj', 'razaoSocial'],
      properties: {
        cnpj: { type: 'string', example: '12345678000199' },
        razaoSocial: { type: 'string', example: 'Empresa X' },
      },
    },
    responsavel: {
      type: 'object',
      required: ['nome', 'cargo', 'telefone', 'email'],
      properties: {
        nome: { type: 'string', example: 'João Silva' },
        cargo: { type: 'string', example: 'Gerente' },
        telefone: { type: 'string', example: '(99)99999-9999' },
        email: { type: 'string', example: 'joao@empresa.com' },
      },
    },
    responsavelTecnoSpeed: {
      type: 'object',
      required: ['respTecno', 'emailTecno'],
      properties: {
        respTecno: { type: 'string', description: 'Responsável TecnoSpeed', example: 'Responsável TecnoSpeed' },
        emailTecno: { type: 'string', description: 'E-mail do responsável TecnoSpeed', example: 'respTecnoSpeed@gmail.com' },
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
        'cidadebanco',
        'ufBanco',
        'convenio',
        'tipoCnabId',
        'gerente',
        'preferenciaContato',
      ],
      properties: {
        bancoId: { type: 'number', example: 2 },
        agencia: { type: 'string', example: '1234' },
        agenciaDV: { type: 'string', example: '5' },
        conta: { type: 'number', example: 67890 },
        contaDV: { type: 'number', example: 1 },
        cidadebanco: { type: 'string', example: 'Maringá', description: 'Cidade da agência bancária' }, // novo campo
        ufBanco: { type: 'string', example: 'PR', description: 'UF da agência bancária' }, // novo campo
        convenio: { type: 'string', example: '123456' },
        tipoCnabId: { type: 'number', example: 1 },
        gerente: {
          type: 'object',
          required: ['nome', 'telefone', 'email'],
          properties: {
            nome: { type: 'string', example: 'Maria Oliveira' },
            telefone: { type: 'string', example: '99999999999' },
            email: { type: 'string', example: 'maria@banco.com' },
          },
        },
        preferenciaContato: {
          type: 'string',
          description: 'Preferência de contato do banco',
          example: 'E-mail'
        },
      },
    },
    produtoId: {
      type: 'number',
      description: 'ID do produto relacionado à Carta VAN',
      example: 1,
    },
  },
  example: {
    emitente: {
      cnpj: "12345678000199",
      razaoSocial: "Empresa X"
    },
    responsavel: {
      nome: "João Silva",
      cargo: "Gerente",
      telefone: "(99)99999-9999",
      email: "joao@empresa.com"
    },
    responsavelTecnoSpeed: {
      respTecno: "Responsável TecnoSpeed",
      emailTecno: "respTecnoSpeed@gmail.com"
    },
    banco: {
      bancoId: 2,
      agencia: "1234",
      agenciaDV: "5",
      conta: 67890,
      contaDV: 1,
      convenio: "123456",
      tipoCnabId: 1,
      gerente: {
        nome: "Maria Oliveira",
        telefone: "99999999999",
        email: "maria@banco.com"
      },
      preferenciaContato: "E-mail"
    },
    produtoId: 1
  },
};

export const vanSchema = {
  tags: ['Carta VAN'],
  summary: 'Criar Carta VAN',
  description:
    'Esta rota é utilizada para criar uma nova Carta VAN, um documento necessário para formalizar a autorização entre o cliente e a Software House junto ao banco.\n\n' +
    'A requisição deve conter informações do emitente, do responsável, do responsável TecnoSpeed, do banco e do gerente responsável.\n' +
    'Todos os dados são validados antes de serem armazenados e, em caso de sucesso, a carta é registrada no sistema com a data e hora da criação.\n\n' +
    'Essa rota é ideal para ser utilizada em sistemas administrativos ou portais internos que precisem gerar este documento para posterior assinatura e envio ao banco.',
  body: vanBodySchema,
  response: vanResponseSchema
};