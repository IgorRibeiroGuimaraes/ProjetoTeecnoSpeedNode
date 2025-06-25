/**
 * Exemplo de uma requisição válida para a criação de uma Carta VAN.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const vanRequestExample = {
  emitente: {
    cnpj: '12345678000199',
    razaoSocial: 'Empresa X',
  },
  responsavel: {
    nome: 'João Silva',
    cargo: 'Gerente',
    telefone: '(99)99999-9999',
    email: 'joao@empresa.com',
  },
  responsavelTecnoSpeed: {
    respTecno: 'Responsável TecnoSpeed',
    emailTecno: 'respTecnoSpeed@gmail.com',
  },
  banco: {
    bancoId: 2,
    agencia: '1234',
    agenciaDV: '5',
    conta: 67890,
    contaDV: 1,
    cidadebanco: 'Maringá', // novo campo
    ufBanco: 'PR',          // novo campo
    convenio: '123456',
    tipoCnabId: 1,
    gerente: {
      nome: 'Maria Oliveira',
      telefone: '99999999999',
      email: 'maria@banco.com',
    },
    preferenciaContato: 'E-mail',
  },
  produtoId: 1,
};

/**
 * Exemplo de uma resposta bem-sucedida para a criação de uma Carta VAN.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const vanResponseExample = {
  id: 1,
  emitente: {
    cnpj: '12345678000199',
    razaoSocial: 'Empresa X',
  },
  responsavel: {
    nome: 'João Silva',
    cargo: 'Gerente',
    telefone: '(99)99999-9999',
    email: 'joao@empresa.com',
  },
  responsavelTecnoSpeed: {
    respTecno: 'Responsável TecnoSpeed',
    emailTecno: 'respTecnoSpeed@gmail.com',
  },
  banco: {
    bancoId: 2,
    agencia: '1234',
    agenciaDV: '5',
    conta: 67890,
    contaDV: 1,
    cidadebanco: 'Maringá', // novo campo
    ufBanco: 'PR',          // novo campo
    convenio: '123456',
    cnab: 'CNAB400',
    gerente: {
      nome: 'Maria Oliveira',
      telefone: '99999999999',
      email: 'maria@banco.com',
    },
    preferenciaContato: 'E-mail',
  },
  produto: {
    id: 1,
    nome: 'Produto X',
    descricao: 'Descrição do Produto X',
  },
  createdAt: '2025-04-12T12:34:56.789Z',
};

/**
 * Exemplo de erro de validação no corpo da requisição.
 * Este exemplo pode ser usado para documentar os possíveis erros de validação.
 */
export const vanErrorValidationExample = {
  erro: 'Erro de validação no corpo da requisição',
  campos: [
    { campo: 'emitente.cnpj', mensagem: 'CNPJ inválido' },
    { campo: 'banco.bancoId', mensagem: 'Banco não encontrado' },
    { campo: 'banco.tipoCnabId', mensagem: 'Tipo de CNAB inválido' },
  ],
};

/**
 * Exemplo de erro interno do servidor.
 * Este exemplo pode ser usado para documentar os possíveis erros inesperados.
 */
export const vanErrorInternalExample = {
  erro: 'Erro interno do servidor',
  detalhe: 'Erro inesperado ao processar a requisição',
};