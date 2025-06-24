import { FastifyReply, FastifyRequest } from 'fastify';
import { findServicoById, updateCartaServico } from '../services/letterService';
import { generateVanLetterPDFHandler } from './generateVanLetterPDFController';
import { updateLetterServiceSchema } from '../schemas/van/letter/updateLetterServicePDFSchema'; // schema criado

export async function updateAndGenerateLetterServicePDFHandler(req: FastifyRequest, rep: FastifyReply) {
  try {
    const { cartaId, servicoId } = updateLetterServiceSchema.parse(req.body);

    const servico = await findServicoById(servicoId);
    if (!servico) {
      return rep.status(404).send({ erro: 'Serviço não encontrado.' });
    }

    const carta = await updateCartaServico({ cartaId, servicoId: servico.id });

    // LOG antes de gerar PDF
    console.log('Gerando PDF para cartaId:', cartaId);

    const signedUrl = await generateVanLetterPDFHandler(cartaId);

    return rep.status(200).send({
      mensagem: 'Serviço atualizado e PDF gerado com sucesso.',
      carta,
      pdfUrl: signedUrl
    });

  } catch (error: any) {
    console.error('Erro detalhado:', error); // <-- log detalhado
    if (error.name === 'ZodError') {
      return rep.status(400).send({ erro: 'Dados inválidos.', detalhes: error.errors });
    }
    return rep.status(500).send({ erro: 'Erro ao atualizar o serviço da carta ou gerar o PDF.' });
  }
}
