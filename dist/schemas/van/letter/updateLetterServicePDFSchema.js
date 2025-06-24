"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVanLetterPDFSchema = exports.updateLetterServiceSchema = void 0;
const zod_1 = require("zod");
exports.updateLetterServiceSchema = zod_1.z.object({
    cartaId: zod_1.z.number({
        required_error: 'O ID da carta é obrigatório.',
        invalid_type_error: 'O ID da carta deve ser um número.'
    }),
    servicoId: zod_1.z.number({
        required_error: 'O ID do serviço é obrigatório.',
        invalid_type_error: 'O ID do serviço deve ser um número.'
    }),
});
exports.generateVanLetterPDFSchema = zod_1.z.object({
    params: zod_1.z.object({
        cartaId: zod_1.z.string().regex(/^\d+$/, 'O ID da carta deve ser um número.').transform(Number)
    })
});
