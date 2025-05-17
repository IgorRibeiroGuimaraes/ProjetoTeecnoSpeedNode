import { FastifyReply, FastifyRequest } from 'fastify';
import {
  verificarCarta,
  buscarStatusAberta,
  contarCartasAbertasPorCarta,
  associarStatusAberta,
} from '../services/sendVanLetterService';

interface SendVanLetterBody {
  cartaId: number; // ID da carta já criada
}

export async function sendVanLetterController(
  req: FastifyRequest<{ Body: SendVanLetterBody }>,
  rep: FastifyReply
) {
  const { cartaId } = req.body;

  try {
    // 1. Verificar se a carta existe
    const carta = await verificarCarta(cartaId);
    if (!carta) {
      return rep.status(404).send({ erro: 'Carta não encontrada.' });
    }

    // 2. Buscar o ID do status "aberta"
    const statusAberta = await buscarStatusAberta();
    if (!statusAberta) {
      return rep.status(500).send({ erro: 'Status "aberta" não encontrado no sistema.' });
    }

    // 3. Verificar o número de vezes que a carta está com o status "aberta"
    const cartasAbertas = await contarCartasAbertasPorCarta(cartaId, statusAberta.id);
    if (cartasAbertas >= 5) {
      return rep.status(400).send({
        erro: 'Limite de 5 validações atingido para esta carta. Aguarde antes de tentar novamente.',
      });
    }

    // 4. Associar o status "aberta" à carta existente
    await associarStatusAberta(cartaId, statusAberta.id);

    return rep.status(201).send({
      mensagem: 'Carta enviada com sucesso.',
      carta,
    });
  } catch (error) {
    console.error('Erro ao enviar carta:', error);
    return rep.status(500).send({ erro: 'Erro interno ao enviar a carta.' });
  }
}