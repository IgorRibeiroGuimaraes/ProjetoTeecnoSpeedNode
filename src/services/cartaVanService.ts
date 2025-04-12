import { prisma } from '../lib/prisma';
import { DateTime } from 'luxon';
import { formatPhone } from '../utils/formatPhone';

/**
 * Serviço para criar uma Carta VAN no banco de dados.
 * Este serviço é responsável por:
 * 1. Processar os dados recebidos da requisição.
 * 2. Inserir os dados no banco de dados utilizando o Prisma.
 * 3. Retornar os dados no formato esperado pelo esquema de resposta.
 *
 * @param data - Dados recebidos da requisição para criar a Carta VAN.
 * @returns Objeto contendo os dados da Carta VAN no formato esperado.
 */
export async function createCartaVan(data: any) {
  // Obtém a data e hora atual em UTC
  const nowInUTC = DateTime.utc().toJSDate();

  // Cria a Carta VAN no banco de dados
  const vanLetter = await prisma.cartaVan.create({
    data: {
      cnpjEmitente: data.emitente.cnpj, // CNPJ do emitente
      razaoSocial: data.emitente.razaoSocial, // Razão social do emitente
      nomeResponsavel: data.responsavel.nome, // Nome do responsável
      cargoResponsavel: data.responsavel.cargo, // Cargo do responsável
      telefone: formatPhone(data.responsavel.telefone), // Telefone do responsável formatado
      email: data.responsavel.email, // E-mail do responsável
      bancoId: data.banco.bancoId, // ID do banco
      agencia: data.banco.agencia, // Agência do banco
      agenciaDV: data.banco.agenciaDV, // Dígito verificador da agência
      conta: data.banco.conta, // Número da conta
      contaDV: data.banco.contaDV, // Dígito verificador da conta
      convenio: data.banco.convenio, // Número do convênio
      tipoCnabId: data.banco.tipoCnabId, // ID do tipo de CNAB
      nomeGerente: data.banco.gerente.nome, // Nome do gerente
      telefoneGerente: formatPhone(data.banco.gerente.telefone), // Telefone do gerente formatado
      emailGerente: data.banco.gerente.email, // E-mail do gerente
      createdAt: nowInUTC, // Data e hora de criação
    },
    include: {
      tipoCnab: true, // Inclui os detalhes do tipo de CNAB na resposta
    },
  });

  // Mapeia os dados retornados pelo Prisma para o formato esperado pelo vanResponseSchema
  return {
    emitente: {
      cnpj: vanLetter.cnpjEmitente, // CNPJ do emitente
      razaoSocial: vanLetter.razaoSocial, // Razão social do emitente
    },
    responsavel: {
      nome: vanLetter.nomeResponsavel, // Nome do responsável
      cargo: vanLetter.cargoResponsavel, // Cargo do responsável
      telefone: vanLetter.telefone, // Telefone do responsável
      email: vanLetter.email, // E-mail do responsável
    },
    banco: {
      bancoId: vanLetter.bancoId, // ID do banco
      agencia: vanLetter.agencia, // Agência do banco
      agenciaDV: vanLetter.agenciaDV, // Dígito verificador da agência
      conta: vanLetter.conta, // Número da conta
      contaDV: vanLetter.contaDV, // Dígito verificador da conta
      convenio: vanLetter.convenio, // Número do convênio
      cnab: vanLetter.tipoCnab.descricao, // Nome do tipo de CNAB
      gerente: {
        nome: vanLetter.nomeGerente, // Nome do gerente
        telefone: vanLetter.telefoneGerente, // Telefone do gerente
        email: vanLetter.emailGerente, // E-mail do gerente
      },
    },
    createdAt: vanLetter.createdAt, // Data e hora de criação
  };
}