import { z } from 'zod';
import { FromSchema } from 'json-schema-to-ts';

export const sendVanLetterSchema = {
  tags: ['Carta VAN'],
  summary: 'Enviar uma carta VAN',
  description: 'Associa o status "aberta" a uma carta existente.',
  body: {
    type: 'object',
    properties: {
      cartaId: { type: 'integer', description: 'ID da carta já criada', example: 1 },
    },
    required: ['cartaId'],
  },
  response: {
    201: {
      description: 'Carta enviada com sucesso.',
      type: 'object',
      properties: {
        mensagem: { type: 'string' },
        carta: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cnpjEmitente: { type: 'string' },
            razaoSocial: { type: 'string' },
          },
        },
      },
    },
    400: {
      description: 'Erro de validação.',
      type: 'object',
      properties: {
        erro: { type: 'string' },
      },
    },
    404: {
      description: 'Carta não encontrada.',
      type: 'object',
      properties: {
        erro: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno.',
      type: 'object',
      properties: {
        erro: { type: 'string' },
      },
    },
  },
} as const;

// Exporta o tipo derivado do esquema
export type SendVanLetterBody = FromSchema<typeof sendVanLetterSchema.body>;

export const sendVanLetterSchemaRequest = z.object({
  body: z.object({
    cartaId: z.number({
      required_error: 'O ID da carta é obrigatório.',
      invalid_type_error: 'O ID da carta deve ser um número.',
    }).int().positive('O ID da carta deve ser um número positivo.'),
  })
});