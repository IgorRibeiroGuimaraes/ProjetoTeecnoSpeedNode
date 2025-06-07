"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVanLetterHandler = createVanLetterHandler;
const vanSchema_1 = require("../schemas/van/letter/vanSchema");
const cartaVanService_1 = require("../services/cartaVanService");
/**
 * Handler para a criação de uma Carta VAN.
 * Este handler é responsável por:
 * 1. Validar o corpo da requisição usando o esquema `vanSchema`.
 * 2. Chamar o serviço `createCartaVan` para processar os dados e criar a carta no banco de dados.
 * 3. Retornar os dados da carta criada no formato esperado.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
async function createVanLetterHandler(req, rep) {
    // Valida o corpo da requisição usando o esquema `vanSchema`
    const parsed = vanSchema_1.vanSchema.safeParse(req.body);
    if (!parsed.success) {
        // Retorna erro 400 se a validação falhar
        return rep.status(400).send({
            erro: 'Erro de validação no corpo da requisição',
            campos: parsed.error.errors.map((issue) => ({
                campo: issue.path.join('.'), // Nome do campo com erro
                mensagem: issue.message, // Mensagem de erro
            })),
        });
    }
    try {
        // Chama o serviço para criar a carta VAN no banco de dados
        const vanLetter = await (0, cartaVanService_1.createCartaVan)(parsed.data);
        // Retorna os dados completos da carta VAN com status 201 (Created)
        return rep.status(201).send(vanLetter);
    }
    catch (error) {
        // Retorna erro 500 se ocorrer um problema inesperado no servidor
        return rep.status(500).send({
            erro: 'Erro ao criar a carta da VAN',
            detalhe: error.message ?? 'Erro inesperado',
        });
    }
}
