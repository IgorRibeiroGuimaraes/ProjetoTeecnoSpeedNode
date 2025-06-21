import type { FastifyReply, FastifyRequest } from 'fastify';
import { buscarStatusAberta, contarCartasAbertasPorCarta, associarStatusAberta, verificarCarta } from '../services/sendVanLetterService';
import { downloadFileFromSupabaseAsBase64 } from '../storage/supabaseStorage';
import axios from 'axios';
import FormData from 'form-data';

interface SendVanLetterBody {
  cartaId: number;
}

/**
 * Handler para o envio do PDF
 * Este handler é responsável por:
 * 1. Verifcar se a carta existe 
 * 2. Validar se o status "aberta" existe e se a carta não atingiu o limite de 5 validações.
 * 3. Fazer o envio do PDF para o Supabase em base64.
 *
 * @param req - Objeto da requisição Fastify.
 * @param rep - Objeto da resposta Fastify.
 * @returns Resposta HTTP com os dados da carta criada ou mensagem de erro.
 */
export async function sendVanLetterController(
  req: FastifyRequest<{ Body: SendVanLetterBody }>,
  rep: FastifyReply
) {
  const { cartaId } = req.body;

  try {
    const carta = await verificarCarta(cartaId);
    if (!carta) {
      return rep.status(404).send({ erro: 'Carta não encontrada.' });
    }

    const statusAberta = await buscarStatusAberta();
    if (!statusAberta) {
      return rep.status(500).send({ erro: 'Status "aberta" não encontrado no sistema.' });
    }

    const cartasAbertas = await contarCartasAbertasPorCarta(cartaId, statusAberta.id);
    if (cartasAbertas >= 5) {
      return rep.status(400).send({
        erro: 'Limite de 5 validações atingido para esta carta. Aguarde antes de tentar novamente.',
      });
    }

    await associarStatusAberta(cartaId, statusAberta.id);

    // Recuperar o PDF do Supabase
    const currentDate = new Date().toISOString().split('T')[0];
    const filePathInBucket = `${carta.cnpjEmitente}/${currentDate}/carta_${carta.servico?.nome}_${cartaId}.pdf`;

    const base64PDF = await downloadFileFromSupabaseAsBase64(filePathInBucket);

    // Dados para enviar e logar
    const dataToSend = {
      cnpj_SH: '11111111111111',
      email: 'guilherme.ganassin@tecnospeed.com.br',
      arquivo: '[arquivo PDF base64 - omitido]',
      CNPJ_cliente: carta.cnpjEmitente,
      Produto: carta.produto.nome,
    };

    // Montar formData
    const formData = new FormData();
    formData.append('cnpj_SH', dataToSend.cnpj_SH);
    formData.append('email', dataToSend.email);
    formData.append('arquivo', `data:application/pdf;base64,${base64PDF}`);
    formData.append('CNPJ_cliente', dataToSend.CNPJ_cliente);
    formData.append('Produto', dataToSend.Produto);

    // Logar os headers do formData

    // Enviar para o Zapier
    const response = await axios.post('https://hooks.zapier.com/hooks/catch/21923307/2gwb3a6/', formData, {
      headers: formData.getHeaders(),
    });

    console.log('Resposta do Zapier:', response.data);

    // Retornar sucesso + dados enviados + resposta do Zapier
    return rep.status(201).send({
      mensagem: 'Carta enviada com sucesso e arquivo enviado ao Zapier.',
      dadosEnviados: dataToSend,
      respostaZapier: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar carta:', error);
    return rep.status(500).send({ erro: 'Erro interno ao enviar a carta.' });
  }
}
