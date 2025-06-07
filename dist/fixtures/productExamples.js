"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsInternalErrorExample = exports.getProductsNotFoundExample = exports.getProductsSuccessExample = void 0;
/**
 * Exemplo de resposta de sucesso para a lista de produtos por banco.
 */
exports.getProductsSuccessExample = {
    bancoId: 1,
    nomeBanco: 'Banco do Brasil S.A.',
    produtosDisponiveis: [
        { id: 101, nome: 'Produto A', descricao: 'Descrição do Produto A' },
        { id: 102, nome: 'Produto B', descricao: 'Descrição do Produto B' },
        { id: 103, nome: 'Produto C', descricao: 'Descrição do Produto C' },
    ],
};
/**
 * Exemplo de erro 404: Banco não encontrado ou sem produtos disponíveis.
 */
exports.getProductsNotFoundExample = {
    erro: 'Banco não encontrado',
    detalhe: 'Nenhum banco foi encontrado com o ID fornecido ou não há produtos disponíveis.',
};
/**
 * Exemplo de erro 500: Erro interno do servidor.
 */
exports.getProductsInternalErrorExample = {
    erro: 'Erro interno do servidor',
    detalhe: 'Erro inesperado ao processar a requisição.',
};
