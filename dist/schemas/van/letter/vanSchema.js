"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanSchema = void 0;
const zod_1 = require("zod");
/**
 * Esquema de validação para o corpo da requisição de criação de uma Carta VAN.
 * Este esquema utiliza a biblioteca Zod para validar os campos e garantir que os dados
 * estejam no formato esperado antes de serem processados.
 */
exports.vanSchema = zod_1.z.object({
    emitente: zod_1.z.object({
        cnpj: zod_1.z.string()
            .length(14, 'cnpjEmitente deve conter 14 dígitos') // Valida que o CNPJ tem exatamente 14 dígitos
            .nonempty('cnpjEmitente não pode ser vazio'), // Garante que o CNPJ não está vazio
        razaoSocial: zod_1.z.string().nonempty('razaoSocial não pode ser vazia'), // Garante que a razão social não está vazia
    }),
    responsavel: zod_1.z.object({
        nome: zod_1.z.string().nonempty('nomeResponsavel não pode ser vazio'), // Nome do responsável não pode ser vazio
        cargo: zod_1.z.string().nonempty('cargoResponsavel não pode ser vazio'), // Cargo do responsável não pode ser vazio
        telefone: zod_1.z.string()
            .nonempty('telefone não pode ser vazio') // Telefone não pode ser vazio
            .regex(/^\d{2} \d{5}-\d{4}$/, 'telefone deve seguir o formato 99 99999-9999'), // Valida o formato do telefone
        email: zod_1.z.string()
            .nonempty('email não pode ser vazio') // E-mail não pode ser vazio
            .email('email inválido'), // Valida que o e-mail está no formato correto
    }),
    banco: zod_1.z.object({
        bancoId: zod_1.z.number(), // ID do banco deve ser um número
        agencia: zod_1.z.string().nonempty('agencia não pode ser vazia'), // Agência não pode ser vazia
        agenciaDV: zod_1.z.string().optional(), // Dígito verificador da agência é opcional
        conta: zod_1.z.number(), // Número da conta deve ser um número
        contaDV: zod_1.z.number(), // Dígito verificador da conta deve ser um número
        convenio: zod_1.z.string().nonempty('convenio não pode ser vazio'), // Convênio não pode ser vazio
        tipoCnabId: zod_1.z.number().int().positive('tipoCnabId deve ser um número positivo'), // Valida o ID do tipo de CNAB
        gerente: zod_1.z.object({
            nome: zod_1.z.string().nonempty('nomeGerente não pode ser vazio'), // Nome do gerente não pode ser vazio
            telefone: zod_1.z.string()
                .nonempty('telefoneGerente não pode ser vazio') // Telefone do gerente não pode ser vazio
                .regex(/^\d{2} \d{5}-\d{4}$/, 'telefoneGerente deve seguir o formato 99 99999-9999'), // Valida o formato do telefone do gerente
            email: zod_1.z.string()
                .nonempty('emailGerente não pode ser vazio') // E-mail do gerente não pode ser vazio
                .email('emailGerente inválido'), // Valida que o e-mail do gerente está no formato correto
        }),
    }),
});
