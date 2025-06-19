import { prisma } from '../lib/prisma';
import { DateTime } from 'luxon';
import { formatPhone } from '../utils/formatPhone';

/**
 * Serviço para criar uma Carta VAN no banco de dados.
 * Este serviço valida se o banco suporta o CNAB especificado antes de criar a carta.
 *
 * @param data - Dados recebidos da requisição para criar a Carta VAN.
 * @returns Objeto contendo os dados da Carta VAN no formato esperado.
 */
export async function createCartaVan(data: any) {
  const produtoId = parseInt(data.produtoId, 10);

  const nowInUTC = DateTime.utc().toJSDate();

  const configuracaoValida = await prisma.bancoConfiguracoes.findFirst({
    where: {
      bancoId: data.banco.bancoId,
      tipoCnab: {
        id: data.banco.tipoCnabId,
      },
      produtoId: produtoId,
    },
  });


  if (!configuracaoValida) {
    throw new Error(
      `O banco com ID ${data.banco.bancoId} não suporta o CNAB com ID ${data.banco.tipoCnabId} e o Produto com ID ${produtoId}.`
    );
  }

  const cartaDuplicada = await prisma.cartaVan.findFirst({
    where: {
      cnpjEmitente: data.emitente.cnpj,
      bancoId: data.banco.bancoId,
      tipoCnabId: data.banco.tipoCnabId,
      produtoId: produtoId,
    },
  });

  if (cartaDuplicada) {
    throw new Error(
      `Já existe uma carta VAN para o CNPJ ${data.emitente.cnpj}, Banco ID ${data.banco.bancoId}, CNAB ID ${data.banco.tipoCnabId} e Produto ID ${produtoId}.`
    );
  }


  const vanLetter = await prisma.cartaVan.create({
    data: {
      cnpjEmitente: data.emitente.cnpj,
      razaoSocial: data.emitente.razaoSocial,
      nomeResponsavel: data.responsavel.nome,
      cargoResponsavel: data.responsavel.cargo,
      telefone: formatPhone(data.responsavel.telefone),
      email: data.responsavel.email,
      bancoId: data.banco.bancoId,
      agencia: data.banco.agencia,
      agenciaDV: data.banco.agenciaDV,
      conta: data.banco.conta,
      contaDV: data.banco.contaDV,
      convenio: data.banco.convenio,
      tipoCnabId: data.banco.tipoCnabId,
      produtoId: produtoId, // Relacionamento com Produto
      nomeGerente: data.banco.gerente.nome,
      telefoneGerente: formatPhone(data.banco.gerente.telefone),
      emailGerente: data.banco.gerente.email,
      createdAt: nowInUTC,
    },
    include: {
      tipoCnab: true,
      banco: true,
      produto: true, // Inclui os detalhes do produto na resposta
    },
  });

  return {
    emitente: {
      cnpj: vanLetter.cnpjEmitente,
      razaoSocial: vanLetter.razaoSocial,
    },
    responsavel: {
      nome: vanLetter.nomeResponsavel,
      cargo: vanLetter.cargoResponsavel,
      telefone: vanLetter.telefone,
      email: vanLetter.email,
    },
    banco: {
      nome: vanLetter.banco.nome,
      agencia: vanLetter.agencia,
      agenciaDV: vanLetter.agenciaDV,
      conta: vanLetter.conta,
      contaDV: vanLetter.contaDV,
      convenio: vanLetter.convenio,
      cnab: vanLetter.tipoCnab.descricao,
      gerente: {
        nome: vanLetter.nomeGerente,
        telefone: vanLetter.telefoneGerente,
        email: vanLetter.emailGerente,
      },
    },
    produto: {
      id: vanLetter.produto.id,
      nome: vanLetter.produto.nome,
      descricao: vanLetter.produto.descricao,
    },
    createdAt: vanLetter.createdAt,
  };
}