/**
 * Exemplo de resposta de sucesso para a atualização de uma Carta VAN.
 */
export const updateVanLetterSuccessExample = {
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
export const updateVanLetterNotFoundExample = {
  erro: 'Carta VAN não encontrada',
  detalhe: 'Nenhuma carta VAN foi encontrada com o ID fornecido.',
};

/**
 * Exemplo de erro 500: Erro interno do servidor.
 */
export const updateVanLetterInternalErrorExample = {
  erro: 'Erro interno do servidor',
  detalhe: 'Erro inesperado ao processar a requisição.',
};