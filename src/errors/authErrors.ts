export class CnpjNaoEncontradoError extends Error {
  constructor(message = 'CNPJ não encontrado no sistema.') {
    super(message);
    this.name = 'CnpjNaoEncontradoError';
  }
}

export class SenhaInvalidaError extends Error {
  constructor(message = 'Senha inválida para o CNPJ fornecido.') {
    super(message);
    this.name = 'SenhaInvalidaError';
  }
}
