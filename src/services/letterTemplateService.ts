import fs from 'fs';
import { getTemplatePaths } from './generateVanLetterPDFService'; // ou mova também esse helper

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
    .replace(/\[CARGO RESP. EMPRESA\]/g, carta.cargoResponsavel || '');

  return html;
}
