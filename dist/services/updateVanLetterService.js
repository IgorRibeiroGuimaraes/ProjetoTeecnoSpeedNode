"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanLetterService = updateVanLetterService;
const prisma_1 = require("../lib/prisma");
/**
 * Serviço para atualizar campos específicos de uma carta VAN.
 *
 * @param id - ID da carta VAN a ser atualizada.
 * @param data - Dados a serem atualizados.
 * @returns A carta VAN atualizada ou null se não encontrada.
 */
async function updateVanLetterService(id, data) {
    try {
        // Verifica se o registro existe antes de tentar atualizar
        const existingVanLetter = await prisma_1.prisma.cartaVan.findUnique({
            where: { id },
        });
        if (!existingVanLetter) {
            throw new Error(`Carta VAN com ID ${id} não encontrada.`);
        }
        // Rastreia os campos alterados dinamicamente
        const camposAlterados = [];
        // Mapeia os campos do banco para os dados recebidos
        const mapeamentoCampos = {
            'emitente.cnpj': data.emitente?.cnpj,
            'emitente.razaoSocial': data.emitente?.razaoSocial,
            'responsavel.nome': data.responsavel?.nome,
            'responsavel.cargo': data.responsavel?.cargo,
            'responsavel.telefone': data.responsavel?.telefone,
            'responsavel.email': data.responsavel?.email,
            'banco.agencia': data.banco?.agencia,
            'banco.agenciaDV': data.banco?.agenciaDV,
            'banco.conta': data.banco?.conta,
            'banco.contaDV': data.banco?.contaDV,
            'banco.convenio': data.banco?.convenio,
            'banco.gerente.nome': data.banco?.gerente?.nome,
            'banco.gerente.telefone': data.banco?.gerente?.telefone,
            'banco.gerente.email': data.banco?.gerente?.email,
        };
        // Itera sobre os campos e verifica alterações
        for (const [campo, valor] of Object.entries(mapeamentoCampos)) {
            const key = campo.split('.').pop();
            if (valor !== undefined && valor !== existingVanLetter[key]) {
                camposAlterados.push({ campo, valor });
            }
        }
        // Atualiza os campos no banco de dados
        const updatedVanLetter = await prisma_1.prisma.cartaVan.update({
            where: { id },
            data: {
                cnpjEmitente: data.emitente?.cnpj,
                razaoSocial: data.emitente?.razaoSocial,
                nomeResponsavel: data.responsavel?.nome,
                cargoResponsavel: data.responsavel?.cargo,
                telefone: data.responsavel?.telefone,
                email: data.responsavel?.email,
                agencia: data.banco?.agencia,
                agenciaDV: data.banco?.agenciaDV,
                conta: data.banco?.conta,
                contaDV: data.banco?.contaDV,
                convenio: data.banco?.convenio,
                nomeGerente: data.banco?.gerente?.nome,
                telefoneGerente: data.banco?.gerente?.telefone,
                emailGerente: data.banco?.gerente?.email,
                tipoCnabId: data.banco?.tipoCnabId,
            },
        });
        // Retorna o ID e os campos alterados
        return {
            id: updatedVanLetter.id,
            camposAlterados,
        };
    }
    catch (error) {
        console.error('Erro ao atualizar a carta VAN no serviço:', error);
        throw new Error('Erro ao atualizar a carta VAN.');
    }
}
