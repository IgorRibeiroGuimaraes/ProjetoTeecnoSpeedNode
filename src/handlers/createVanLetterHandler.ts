import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { vanSchema } from '../schemas/vanSchema';
import { formatPhone } from '../utils/formatPhone';
import { DateTime } from 'luxon'

export async function createVanLetterHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = vanSchema.safeParse(request.body);

  if (!parsed.success) {
    const issues = parsed.error.errors.map(issue => ({
      campo: issue.path.join('.'),
      mensagem: issue.message,
    }));

    return reply.status(400).send({
      erro: 'Erro de validação no corpo da requisição',
      campos: issues,
    });
  }

  const { telefone, telefoneGerente, ...rest } = parsed.data;

  try {
  const nowInBrasilia = DateTime.now().setZone('America/Sao_Paulo').toJSDate();

    const vanLetter = await prisma.cartaVan.create({
      data: {
        ...rest,
        telefone: formatPhone(telefone),
        telefoneGerente: formatPhone(telefoneGerente),
        createdAt: nowInBrasilia ?? new Date().toISOString(),
      },
    });
    
    return reply.status(201).send(vanLetter);
  } catch (error: any) {
    if (error.code === 'P2003') {
      return reply.status(400).send({
        erro: 'Banco não encontrado',
        detalhe: 'O bancoId fornecido não existe na base de dados.',
      });
    }

    return reply.status(500).send({
      erro: 'Erro ao criar a carta da VAN',
      detalhe: error.message ?? 'Erro inesperado',
    });
  }
}


