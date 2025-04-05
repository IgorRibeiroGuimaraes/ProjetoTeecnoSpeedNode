import { z } from 'zod';

export const vanSchema = z.object({
  cnpjSoftwareHouse: z.string({
    required_error: 'cnpjSoftwareHouse não pode ser nulo',
    invalid_type_error: 'cnpjSoftwareHouse deve ser uma string',
  }).length(14, 'cnpjSoftwareHouse deve conter 14 dígitos')
    .nonempty('cnpjSoftwareHouse não pode ser vazio'),

  cnpjEmitente: z.string({
    required_error: 'cnpjEmitente não pode ser nulo',
    invalid_type_error: 'cnpjEmitente deve ser uma string',
  }).length(14, 'cnpjEmitente deve conter 14 dígitos')
    .nonempty('cnpjEmitente não pode ser vazio'),

  razaoSocial: z.string({
    required_error: 'razaoSocial não pode ser nulo',
    invalid_type_error: 'razaoSocial deve ser uma string',
  }).nonempty('razaoSocial não pode ser vazia'),

  nomeResponsavel: z.string({ required_error: 'nomeResponsavel não pode ser nulo' })
    .nonempty('nomeResponsavel não pode ser vazio'),

  cargoResponsavel: z.string({ required_error: 'cargoResponsavel não pode ser nulo' })
    .nonempty('cargoResponsavel não pode ser vazio'),

  telefone: z.string({ required_error: 'telefone não pode ser nulo' })
    .nonempty('telefone não pode ser vazio')
    .regex(/^\d{2} \d{5}-\d{4}$/, 'telefone deve seguir o formato 99 99999-9999'),

  email: z.string({ required_error: 'email não pode ser nulo' })
    .nonempty('email não pode ser vazio')
    .email('email inválido'),

  bancoId: z.number({
    required_error: 'bancoId não pode ser nulo',
    invalid_type_error: 'bancoId deve ser um número',
  }),

  agencia: z.string({ required_error: 'agencia não pode ser nulo' })
    .nonempty('agencia não pode ser vazia'),

  agenciaDV: z.string().optional(),

  conta: z.number({
    required_error: 'conta não pode ser nulo',
    invalid_type_error: 'conta deve ser um número',
  }),

  contaDV: z.number({
    required_error: 'contaDV não pode ser nulo',
    invalid_type_error: 'contaDV deve ser um número',
  }),

  convenio: z.string({ required_error: 'convenio não pode ser nulo' })
    .nonempty('convenio não pode ser vazio'),

  cnab: z.enum(['CNAB240', 'CNAB400', 'CNAB444'], {
    errorMap: () => ({
      message: 'cnab deve ser CNAB240, CNAB400 ou CNAB444',
    }),
  }),

  nomeGerente: z.string({ required_error: 'nomeGerente não pode ser nulo' })
    .nonempty('nomeGerente não pode ser vazio'),

  telefoneGerente: z.string({ required_error: 'telefoneGerente não pode ser nulo' })
    .nonempty('telefoneGerente não pode ser vazio')
    .regex(/^\d{2} \d{5}-\d{4}$/, 'telefoneGerente deve seguir o formato 99 99999-9999'),

  emailGerente: z.string({ required_error: 'emailGerente não pode ser nulo' })
    .nonempty('emailGerente não pode ser vazio')
    .email('emailGerente inválido'),
});
