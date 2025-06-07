"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanLetterInternalErrorExample = exports.updateVanLetterNotFoundExample = exports.updateVanLetterSuccessExample = void 0;
/**
 * Exemplo de resposta de sucesso para a atualização de uma Carta VAN.
 */
exports.updateVanLetterSuccessExample = {
    id: 1,
    camposAlterados: [
        { campo: 'emitente.cnpj', valor: '12345678000199' },
        { campo: 'responsavel.nome', valor: 'Maria Souza' },
        { campo: 'banco.agencia', valor: '5678' },
    ],
};
/**
 * Exemplo de erro 404: Carta VAN não encontrada.
 */
exports.updateVanLetterNotFoundExample = {
    erro: 'Carta VAN não encontrada',
    detalhe: 'Nenhuma carta VAN foi encontrada com o ID fornecido.',
};
/**
 * Exemplo de erro 500: Erro interno do servidor.
 */
exports.updateVanLetterInternalErrorExample = {
    erro: 'Erro interno do servidor',
    detalhe: 'Erro inesperado ao processar a requisição.',
};
