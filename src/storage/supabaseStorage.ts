import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_KEY não estão definidas nas variáveis de ambiente.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Faz upload de um arquivo PDF para o bucket do Supabase usando buffer.
 *
 * @param pdfBuffer - Buffer do arquivo PDF.
 * @param clientId - Identificador único do cliente (ex.: CNPJ ou ID).
 * @param fileName - Nome do arquivo no bucket.
 * @returns - Dados do arquivo enviado ou erro.
 */
export async function uploadPdfToSupabase(pdfBuffer: Buffer, filePathInBucket: string) {
  const { data, error } = await supabase.storage
    .from('van-letters-pdfs')
    .upload(filePathInBucket, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    console.error('Erro do Supabase:', error);
    throw new Error(error.message);
  }
  return data;
}


/**
 * Gera uma URL assinada para o arquivo PDF armazenado no Supabase.
 *
 * @param fileName - Nome do arquivo no bucket (com o caminho completo).
 * @param expiresIn - Tempo de expiração em segundos (ex.: 3600 para 1 hora).
 * @returns - URL assinada ou erro.
 */
export async function getSignedUrl(fileName: string, expiresIn: number) {
  const { data, error } = await supabase.storage
    .from('van-letters-pdfs')
    .createSignedUrl(fileName, expiresIn);

  if (error) {
    console.error('Erro ao gerar URL assinada:', error.message);
    return null;
  }

  return data.signedUrl;
}

/**
 * Faz o download de um arquivo PDF armazenado no Supabase Storage e o converte para Base64.
 *
 * @param filePathInBucket - Caminho completo do arquivo dentro do bucket 'van-letters-pdfs'.
 * @returns - Conteúdo do arquivo codificado em Base64.
 * @throws - Lança erro se o arquivo não puder ser baixado do Supabase.
 */
export async function downloadFileFromSupabaseAsBase64(filePathInBucket: string) {
  const { data, error } = await supabase.storage
    .from('van-letters-pdfs')
    .download(filePathInBucket);

  if (error || !data) {
    console.error('Erro ao baixar arquivo do Supabase:', error?.message);
    throw new Error('Não foi possível baixar o arquivo.');
  }

  const buffer = await data.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
}
