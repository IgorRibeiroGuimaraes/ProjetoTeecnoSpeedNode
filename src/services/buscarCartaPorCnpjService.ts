import { prisma } from '../lib/prisma';

export async function buscarCartaPorCnpjService(cnpj: string) {
  const carta = await prisma.cartaVan.findFirst({
    where: { cnpjEmitente: cnpj, servicoId: { not: null } },
    include: { 
      produto: true, 
      servico: true,
      tipoCnab: true,
      banco: true,
      status: {
        orderBy: { createdAt: 'desc' },
        take: 1, // pega o status mais recente
        include: { status: true }
      }
    },
    orderBy: { createdAt: 'desc' } // Busca a carta mais recente
  });

  if (!carta) return null;

  return {
    id: carta.id,
    dataCriacao: carta.createdAt,
    produto: carta.produto.nome,
    servicoNome: carta.servico?.nome,
    createdAt: carta.createdAt,
    tipoCnab: carta.tipoCnab?.descricao,
    banco: carta.banco?.nome,
    status: carta.status[0]?.status?.descricao || null, 
  };
}