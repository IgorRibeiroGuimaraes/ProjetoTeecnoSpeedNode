/**
 * Exemplo de uma requisição válida para a criação de uma Carta VAN.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const vanRequestExample = {
  emitente: {
    cnpj: '98765432000187', // CNPJ do emitente
    razaoSocial: 'Empresa Exemplo LTDA', // Razão social do emitente
  },
  responsavel: {
    nome: 'João da Silva', // Nome do responsável
    cargo: 'Diretor', // Cargo do responsável
    telefone: '11 98765-4321', // Telefone do responsável
    email: 'joao.silva@empresa.com', // E-mail do responsável
  },
  banco: {
    bancoId: 1, // ID do banco
    agencia: '1234', // Agência do banco
    agenciaDV: 'X', // Dígito verificador da agência
    conta: 56789, // Número da conta
    contaDV: 0, // Dígito verificador da conta
    convenio: '123456', // Número do convênio
    tipoCnabId: 1, // ID do tipo de CNAB
    gerente: {
      nome: 'Carlos Oliveira', // Nome do gerente
      telefone: '11 91234-5678', // Telefone do gerente
      email: 'carlos.oliveira@banco.com', // E-mail do gerente
    },
  },
  produtoId: 3, // ID do produto
};

/**
 * Exemplo de uma resposta bem-sucedida para a criação de uma Carta VAN.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const vanResponseExample = {
  id : 1, // ID da carta VAN 
  emitente: {
    cnpj: '98765432000187', // CNPJ do emitente
    razaoSocial: 'Empresa Exemplo LTDA', // Razão social do emitente
  },
  responsavel: {
    nome: 'João da Silva', // Nome do responsável
    cargo: 'Diretor', // Cargo do responsável
    telefone: '11 98765-4321', // Telefone do responsável
    email: 'joao.silva@empresa.com', // E-mail do responsável
  },
  banco: {
    bancoId: 1, // ID do banco
    agencia: '1234', // Agência do banco
    agenciaDV: 'X', // Dígito verificador da agência
    conta: 56789, // Número da conta
    contaDV: 0, // Dígito verificador da conta
    convenio: '123456', // Número do convênio
    cnab: 'CNAB400', // Nome do tipo de CNAB
    gerente: {
      nome: 'Carlos Oliveira', // Nome do gerente
      telefone: '11 91234-5678', // Telefone do gerente
      email: 'carlos.oliveira@banco.com', // E-mail do gerente
    },
  },
  produto: {
    id: 3, // ID do produto
    nome: 'Produto X', // Nome do produto
    descricao: 'Descrição do Produto X', // Descrição do produto
  },
  createdAt: '2025-04-12T12:34:56.789Z', // Data e hora de criação da carta
};

/**
 * Exemplo de erro de validação no corpo da requisição.
 * Este exemplo pode ser usado para documentar os possíveis erros de validação.
 */
export const vanErrorValidationExample = {
  erro: 'Erro de validação no corpo da requisição', // Mensagem geral de erro
  campos: [
    { campo: 'emitente.cnpj', mensagem: 'CNPJ inválido' }, // Detalhe do erro no campo CNPJ
    { campo: 'banco.bancoId', mensagem: 'Banco não encontrado' }, // Detalhe do erro no campo bancoId
    { campo: 'banco.tipoCnabId', mensagem: 'Tipo de CNAB inválido' }, // Detalhe do erro no campo tipoCnabId
  ],
};

/**
 * Exemplo de erro interno do servidor.
 * Este exemplo pode ser usado para documentar os possíveis erros inesperados.
 */
export const vanErrorInternalExample = {
  erro: 'Erro interno do servidor', // Mensagem geral de erro
  detalhe: 'Erro inesperado ao processar a requisição', // Detalhe do erro interno
};