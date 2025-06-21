import { FastifyReply, FastifyRequest } from 'fastify';
import { findServicoById, updateCartaServico } from '../services/letterService';
import { generateVanLetterPDFHandler } from './generateVanLetterPDFController';

/**
 * Controller para atualizar o serviço associado a uma carta.
 *
 * Recebe no body o ID da carta e o ID do serviço a ser associado.
 *
 * @param req - Objeto da requisição HTTP.
 * @param rep - Objeto da resposta HTTP.
 * @returns Retorna uma mensagem de sucesso com os dados da carta atualizada ou um erro em caso de falha.
 */
export async function updateAndGenerateLetterServicePDFHandler(req: FastifyRequest, rep: FastifyReply) {
  const { cartaId, servicoId } = req.body as { cartaId: number; servicoId: number };

  if (!cartaId || !servicoId) {
    return rep.status(400).send({ erro: 'É necessário informar o ID da carta e o ID do serviço.' });
  }

  try {
    const servico = await findServicoById(servicoId);
    if (!servico) {
      return rep.status(404).send({ erro: 'Serviço não encontrado.' });
    }

    const carta = await updateCartaServico({ cartaId, servicoId: servico.id });

    const signedUrl = await generateVanLetterPDFHandler(cartaId); // gera e retorna a URL do PDF

    return rep.status(200).send({
      mensagem: 'Serviço atualizado e PDF gerado com sucesso.',
      carta,
      pdfUrl: signedUrl // aqui já retorna a URL gerada
    });

  } catch (error: any) {
    console.error('Erro ao atualizar serviço ou gerar PDF:', error);
    return rep.status(500).send({ erro: 'Erro ao atualizar o serviço da carta ou gerar o PDF.' });
  }
}