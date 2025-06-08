export const loginSchema = {
  tags: ['Autenticação'],
  summary: 'Realizar login',
  description: 'Autentica o usuário e retorna um Access Token.',
  body: {
    type: 'object',
    properties: {
      cnpj: { type: 'string', description: 'CNPJ da empresa', example: '12345678000199' },
      senha: { type: 'string', description: 'Senha do usuário', example: 'senha123' },
    },
    required: ['cnpj', 'senha'],
  },
  response: {
    200: {
      description: 'Login realizado com sucesso.',
      type: 'object',
      properties: {
        mensagem: { type: 'string' },
        token: { type: 'string', description: 'Access Token' },
      },
    },
    400: {
      description: 'Erro de validação.',
      type: 'object',
      properties: {
        erro: { type: 'string' },
      },
    },
  },
};