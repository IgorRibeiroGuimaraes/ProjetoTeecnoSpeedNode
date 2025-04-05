export const vanBodySchema = {
  type: 'object',
  required: [
    'cnpjSoftwareHouse', 'cnpjEmitente', 'razaoSocial', 'nomeResponsavel',
    'cargoResponsavel', 'telefone', 'email', 'bancoId', 'agencia',
    'agenciaDV', 'conta', 'contaDV', 'convenio', 'cnab',
    'nomeGerente', 'telefoneGerente', 'emailGerente'
  ],
  properties: {
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
    cnab: {
      type: 'string',
      enum: ['CNAB240', 'CNAB400', 'CNAB444'],
    },
    nomeGerente: { type: 'string' },
    telefoneGerente: { type: 'string' },
    emailGerente: { type: 'string' },
  }
};
