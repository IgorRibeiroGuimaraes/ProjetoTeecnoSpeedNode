// src/services/generateVanLetterPDFService.ts

import { getCartaById, generatePDF } from '../services/generateVanLetterPDFService';
import { uploadPdfToSupabase, getSignedUrl } from '../storage/supabaseStorage';
import { generateLetterHtmlFromTemplate } from '../services/letterTemplateService';

/**
 * Handler para geração do PDF da carta VAN
 * Este handler é responsável por:
 * 1. Gerar o PDF da carta com base no template e nos dados da carta.
 * 2. Fazer o upload do PDF gerado para o Supabase.
 * 3. Retornar a URL assinada do PDF gerado.
 *
 * @param cartaId - ID da carta a ser processada.
 * @returns URL assinada do PDF ou lança erro em caso de falha.
 */
export async function generateVanLetterPDFHandler(cartaId: number): Promise<string> {
  console.log('Iniciando geração do PDF para cartaId:', cartaId);

  const carta = await getCartaById(cartaId);

  if (!carta) {
    console.error('Carta não encontrada');
    throw new Error('Carta não encontrada.');
  }

  if (!carta.servico) {
    console.error('Serviço não definido para esta carta.');
    throw new Error('Serviço não definido para esta carta.');
  }

  const html = generateLetterHtmlFromTemplate(carta);
  console.log('HTML gerado');

  const pdfBuffer = await generatePDF(html);
  console.log('PDF gerado, tamanho:', pdfBuffer.length);

  const clientId = carta.cnpjEmitente || 'default-client';
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `carta_${carta.servico.nome}_${carta.id}.pdf`;
  const filePathInBucket = `${clientId}/${currentDate}/${fileName}`;

  await uploadPdfToSupabase(pdfBuffer, filePathInBucket);
  console.log('PDF enviado para Supabase:', filePathInBucket);

  const signedUrl = await getSignedUrl(filePathInBucket, 3600);
  console.log('URL assinada obtida:', signedUrl);

  if (!signedUrl) {
    console.error('Erro ao gerar URL assinada.');
    throw new Error('Erro ao gerar URL assinada.');
  }

  return signedUrl;
}
