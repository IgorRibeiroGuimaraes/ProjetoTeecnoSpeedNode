import fs from 'fs';
import { getTemplatePaths } from './generateVanLetterPDFService';

export function generateLetterHtmlFromTemplate(carta: any): string {
  const { templatePath, cssPath } = getTemplatePaths(carta.servico.nome);

  let html = fs.readFileSync(templatePath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  html = html.replace('</head>', `<style>${cssContent}</style></head>`);

  const agenciaConta = `${carta.agencia} / ${carta.conta}`;

  html = html
    .replace(/\[NOME DO BANCO\]/g, carta.banco.nome)
    .replace(/\[NOME DA EMPRESA\]/g, carta.razaoSocial || '')
    .replace(/\[CNPJ DA EMPRESA\]/g, carta.cnpjEmitente || '')
    .replace(/\[NOME DO GERENTE DA CONTA\]/g, carta.nomeGerente || '')
    .replace(/\[CONVÊNIO DA EMPRESA\]/g, carta.convenio || '')
    .replace(/\[NOME DO RESPONSÁVEL DA EMPRESA\]/g, carta.nomeResponsavel || '')
    .replace(/\[E-MAIL DO RESPONSÁVEL DA EMPRESA\]/g, carta.email || '')
    .replace(/\[TELEFONE DO RESPONSÁVEL DA EMPRESA\]/g, carta.telefone || '')
    .replace(/\[E-MAIL DO GERENTE DA CONTA\]/g, carta.emailGerente || '')
    .replace(/\[TELEFONE DO GERENTE DA CONTA\]/g, carta.telefoneGerente || '')
    .replace(/\[AGÊNCIA E CONTA DA EMPRESA\]/g, agenciaConta || '')
    .replace(/\[AGÊNCIA DO BANCO\]/g, carta.agencia)
    .replace(/\[NOME DO GERENTE DO BANCO\]/g, carta.nomeGerente)
    .replace(/\[TELEFONE GERENTE\]/g, carta.telefoneGerente || '')
    .replace(/\[E-MAIL GERENTE DO BANCO\]/g, carta.emailGerente || '')
    .replace(/\[CARGO RESP. EMPRESA\]/g, carta.cargoResponsavel || '')
    .replace(/\[PRODUTO DO CARTA\]/g, carta.produto?.nome || '')
    .replace(/\[CNAB\]/g, carta.tipoCnab?.descricao || '');

  // Substituição das opções selecionadas
  html = marcarOpcoesSelecionadas(html, carta);
  html = marcarCnabSelecionado(html, carta);

  return html;
}

function marcarOpcoesSelecionadas(html: string, carta: any): string {
  // Produtos selecionados com os nomes (agora já buscados no banco)
  const opcoesSelecionadas = carta.produto?.nome || [];

  const opcoes = [
    'Cobrança',
    'Pagamento a Fornecedores',
    'Pagamento de Tributos',
    'Pagamento de Salários',
    'Extrato',
    'Código de Barras / Arrecadação',
  ];

  opcoes.forEach(opcao => {
    const regex = new RegExp(`\\( \\) ${escapeRegExp(opcao)}`, 'g');
    if (opcoesSelecionadas.includes(opcao)) {
      html = html.replace(regex, `( X ) ${opcao}`);
    }
  });

  return html;
}

function marcarCnabSelecionado(html: string, carta: any): string {
  // Supondo que carta.tipoCnab?.descricao traga algo como '240' ou '400'
  const cnabSelecionado = carta.tipoCnab?.descricao || '';

  const cnabs = ['240', '400', '444'];

  cnabs.forEach(cnab => {
    const regex = new RegExp(`\\( \\) ${escapeRegExp(cnab)}`, 'g');
    if (cnabSelecionado === cnab) {
      html = html.replace(regex, `( X ) ${cnab}`);
    }
  });

  return html;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}