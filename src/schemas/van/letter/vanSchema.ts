import { z } from 'zod';

/**
 * Esquema de validação para o corpo da requisição de criação de uma Carta VAN.
 * Este esquema utiliza a biblioteca Zod para validar os campos e garantir que os dados
 * estejam no formato esperado antes de serem processados.
 */
export const vanSchema = z.object({
  emitente: z.object({
    cnpj: z.string()
      .length(14, 'cnpjEmitente deve conter 14 dígitos') // Valida que o CNPJ tem exatamente 14 dígitos
      .nonempty('cnpjEmitente não pode ser vazio'), // Garante que o CNPJ não está vazio
    razaoSocial: z.string().nonempty('razaoSocial não pode ser vazia'), // Garante que a razão social não está vazia
  }),

  responsavel: z.object({
    nome: z.string().nonempty('nomeResponsavel não pode ser vazio'), // Nome do responsável não pode ser vazio
    cargo: z.string().nonempty('cargoResponsavel não pode ser vazio'), // Cargo do responsável não pode ser vazio
    telefone: z.string()
              .nonempty('telefone não pode ser vazio') // Telefone não pode ser vazio
              .regex(
                /^(\d{2} \d{5}-\d{4}|\d{11}|\(\d{2}\)\d{5}-\d{4})$/,
                'telefone deve seguir um dos formatos: 99 99999-9999, 99999999999 ou (99)99999-9999'
              ), // Valida o formato do telefone
    email: z.string()
      .nonempty('email não pode ser vazio') // E-mail não pode ser vazio
      .email('email inválido'), // Valida que o e-mail está no formato correto
  }),

  responsavelTecnoSpeed: z.object({
    respTecno: z.string().nonempty('respTecno não pode ser vazio'),
    emailTecno: z.string().nonempty('emailTecno não pode ser vazio').email('emailTecno inválido'),
  }),

  banco: z.object({
    bancoId: z.number(), // ID do banco deve ser um número
    agencia: z.string().nonempty('agencia não pode ser vazia'), // Agência não pode ser vazia
    agenciaDV: z.string().optional(), // Dígito verificador da agência é opcional
    conta: z.number(), // Número da conta deve ser um número
    contaDV: z.number(), // Dígito verificador da conta deve ser um número
    cidadebanco: z.string().nonempty('cidadebanco não pode ser vazia'), // Cidade do banco obrigatória
    ufBanco: z.string().length(2, 'ufBanco deve ter 2 caracteres').nonempty('ufBanco não pode ser vazio'), // UF obrigatória
    convenio: z.string().nonempty('convenio não pode ser vazio'), // Convênio não pode ser vazio
    tipoCnabId: z.number().int().positive('tipoCnabId deve ser um número positivo'), // Valida o ID do tipo de CNAB
    gerente: z.object({
      nome: z.string().nonempty('nomeGerente não pode ser vazio'), // Nome do gerente não pode ser vazio
      telefone: z.string()
        .nonempty('telefone não pode ser vazio')
        .regex(
          /^(\d{2} \d{5}-\d{4}|\d{11}|\(\d{2}\)\d{5}-\d{4})$/,
          'telefone deve seguir um dos formatos: 99 99999-9999, 99999999999 ou (99)99999-9999'
        ),
      email: z.string()
        .nonempty('emailGerente não pode ser vazio')
        .email('emailGerente inválido'),
    }),
    preferenciaContato: z.string().nonempty('preferenciaContato não pode ser vazio'), // Preferência de contato
  }),
  produtoId: z.number().int().positive('O campo Produto ID deve ser um número positivo'),
});