/**
 * Exemplo de uma requisição para buscar um produto pelo ID.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const productRequestExample = {
  id: 1, // ID do produto a ser buscado
};

/**
 * Exemplo de uma resposta bem-sucedida para a rota /produto/:id.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const productResponseExample = {
  id: 1,
  nome: 'Boletos', // Nome do produto
  descricao: 'Trafegar arquivos de remessa e retorno de boletos', // Descrição do produto
};

/**
 * Exemplo de uma resposta de erro 404 para a rota /produto/:id.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const productNotFoundExample = {
  erro: 'Produto não encontrado', // Mensagem geral de erro
  detalhe: 'Nenhum produto com o ID 99 foi encontrado.', // Detalhe do erro
};

/**
 * Exemplo de uma resposta de erro 500 para a rota /produto/:id.
 * Este exemplo pode ser usado em testes ou na documentação da API.
 */
export const productInternalErrorExample = {
  erro: 'Erro ao buscar o produto', // Mensagem geral de erro
  detalhe: 'Erro inesperado ao processar a requisição', // Detalhe do erro interno
};