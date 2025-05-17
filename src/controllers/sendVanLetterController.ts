import { FastifyReply, FastifyRequest } from 'fastify';
import {
  verificarCarta,
  buscarStatusAberta,
  contarCartasAbertas,
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

    // 3. Verificar o número de cartas abertas
    const cartasAbertas = await contarCartasAbertas(statusAberta.id);
    if (cartasAbertas >= 5) {
      return rep.status(400).send({
        erro: 'Limite de 5 cartas abertas atingido. Aguarde a finalização de uma carta antes de enviar outra.',
      });
    }

    // 4. Associar o status "aberta" à carta existente
    await associarStatusAberta(carta.id, statusAberta.id);

    return rep.status(201).send({
      mensagem: 'Carta enviada com sucesso.',
      carta,
    });
  } catch (error) {
    console.error('Erro ao enviar carta:', error);
    return rep.status(500).send({ erro: 'Erro interno ao enviar a carta.' });
  }
}