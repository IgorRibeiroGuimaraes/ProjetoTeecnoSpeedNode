import { z } from 'zod';

export const updateLetterServiceSchema = z.object({
  cartaId: z.number({
    required_error: 'O ID da carta é obrigatório.',
    invalid_type_error: 'O ID da carta deve ser um número.'
  }),
  servicoId: z.number({
    required_error: 'O ID do serviço é obrigatório.',
    invalid_type_error: 'O ID do serviço deve ser um número.'
  }),
});

export const generateVanLetterPDFSchema = z.object({
  params: z.object({
    cartaId: z.string().regex(/^\d+$/, 'O ID da carta deve ser um número.').transform(Number)
  })
});