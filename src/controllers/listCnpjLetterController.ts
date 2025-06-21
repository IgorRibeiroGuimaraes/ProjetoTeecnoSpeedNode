import { FastifyRequest, FastifyReply } from 'fastify';
import { buscarCartaPorCnpjService } from '../services/buscarCartaPorCnpjService';
import { getSignedUrl } from '../storage/supabaseStorage';

/**
 * Handler para o envio do PDF
 * Este handler é responsável por:
 * 1. Trazer as cartas através do CNPJ sendo eles alguns campos específicos.
 * 2. Gerar uma URL assinada para o PDF da carta.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
export async function getLetterController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { cnpj } = request.query as { cnpj?: string };

    if (!cnpj) {
      return reply.status(400).send({ message: 'CNPJ é obrigatório.' });
    }

    const carta = await buscarCartaPorCnpjService(cnpj);

    if (!carta) {
      return reply.status(404).send({ message: 'Carta não encontrada para o CNPJ informado.' });
    }

    const sanitizedCnpj = cnpj.replace(/[^\d]/g, '');
    const dataCriacaoFormatada = carta.createdAt.toISOString().split('T')[0];
    const filePathInBucket = `${sanitizedCnpj}/${dataCriacaoFormatada}/carta_${carta.servicoNome}_${carta.id}.pdf`;

    const signedUrl = await getSignedUrl(filePathInBucket, 3600);

    if (!signedUrl) {
      return reply.status(500).send({ message: 'Não foi possível gerar a URL do arquivo.' });
    }

    return reply.send({
      id_da_carta: carta.id,
      banco: carta.banco,
      produto: carta.produto,
      tipoCnab: carta.tipoCnab,
      servico: carta.servicoNome,
      pdfUrl: signedUrl,
      dataCriacao: carta.dataCriacao,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro interno ao buscar a carta.' });
  }
}
