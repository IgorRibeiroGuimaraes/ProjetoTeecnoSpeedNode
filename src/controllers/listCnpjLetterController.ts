import { FastifyRequest, FastifyReply } from 'fastify';
import { buscarCartaPorCnpjService } from '../services/buscarCartaPorCnpjService';
import { getSignedUrl } from '../storage/supabaseStorage';
import { listLetterCNPJSchema } from '../schemas/van/letter/listcnpjletterschema';

/**
 * Handler para o envio do PDF.
 */
export async function getLetterController(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Validação usando Zod
    const { cnpj } = listLetterCNPJSchema.parse(request).query;

    const carta = await buscarCartaPorCnpjService(cnpj);

    if (!carta) {
      return reply.status(404).send({ message: 'Carta não encontrada para o CNPJ informado.' });
    }

    const sanitizedCnpj = cnpj.replace(/[^\d]/g, '');
    const dataCriacaoFormatada = carta.createdAt.toISOString().split('T')[0];
    const filePathInBucket = `${sanitizedCnpj}/${dataCriacaoFormatada}/carta_${carta.servicoNome}_${carta.id}.pdf`;

    console.log(filePathInBucket)
    const signedUrl = await getSignedUrl(filePathInBucket, 3600);

    if (!signedUrl) {
      return reply.status(500).send({ message: 'Não foi possível gerar a URL do arquivo.' });
    }

    return reply.send([{
      id_da_carta: carta.id,
      banco: carta.banco,
      produto: carta.produto,
      tipoCnab: carta.tipoCnab,
      servico: carta.servicoNome,
      status: carta.status,
      pdfUrl: signedUrl,
      dataCriacao: carta.dataCriacao,
    }]);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        message: 'Parâmetros inválidos.',
        detalhes: error.errors
      });
    }

    console.error(error);
    return reply.status(500).send({ message: 'Erro interno ao buscar a carta.' });
  }
}
