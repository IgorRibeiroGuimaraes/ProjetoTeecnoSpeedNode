import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.banco.createMany({
    data: [
      { nome: 'Banco do Brasil S.A.' },
      { nome: 'Itaú Unibanco S.A.' },
      { nome: 'Banco Santander S.A.' },
      { nome: 'Banco Inter S.A.' },
      { nome: 'Caixa Econômica Federal' },
    ],
    skipDuplicates: true,
  });

  await prisma.produto.createMany({
    data: [
      {
        nome: 'Boletos',
        descricao: 'Trafegar arquivos de remessa e retorno de boletos',
      },
      {
        nome: 'Pagamentos',
        descricao: 'Trafegar arquivos de remessa e retorno de pagamentos',
      },
      {
        nome: 'Extrato',
        descricao: 'Trafegar arquivos de extratos',
      },
      {
        nome: 'DDA',
        descricao: 'Trafegar arquivos de varredura de débitos',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.servico.createMany({
    data: [
      { nome: 'Finnet' },
      { nome: 'Nexxera' },
    ],
    skipDuplicates: true,
  });

  await prisma.statusCarta.createMany({
    data: [
      { descricao: 'Aberta' },
      { descricao: 'Fechada' },
    ],
    skipDuplicates: true,
  });

  await prisma.tipoCnab.createMany({
    data: [
      { descricao: '240' },
      { descricao: '400' },
      { descricao: '444' }
    ],
    skipDuplicates: true,
  });

  await prisma.bancoConfiguracoes.createMany({
    data: [
      { id: 1, bancoId: 1, cnabId: 1, produtoId: 1 },
      { id: 2, bancoId: 1, cnabId: 1, produtoId: 2 },
      { id: 3, bancoId: 1, cnabId: 1, produtoId: 3 },
      { id: 4, bancoId: 1, cnabId: 1, produtoId: 4 },
      { id: 5, bancoId: 1, cnabId: 2, produtoId: 1 },
      { id: 6, bancoId: 1, cnabId: 2, produtoId: 2 },
      { id: 7, bancoId: 1, cnabId: 2, produtoId: 3 },
      { id: 8, bancoId: 1, cnabId: 2, produtoId: 4 },
      { id: 9, bancoId: 2, cnabId: 1, produtoId: 1 },
      { id: 10, bancoId: 2, cnabId: 1, produtoId: 2 },
      { id: 11, bancoId: 2, cnabId: 1, produtoId: 3 },
      { id: 12, bancoId: 2, cnabId: 1, produtoId: 4 },
      { id: 13, bancoId: 2, cnabId: 2, produtoId: 1 },
      { id: 14, bancoId: 2, cnabId: 2, produtoId: 2 },
      { id: 15, bancoId: 2, cnabId: 2, produtoId: 3 },
      { id: 16, bancoId: 2, cnabId: 3, produtoId: 1 },
      { id: 17, bancoId: 2, cnabId: 3, produtoId: 2 },
      { id: 18, bancoId: 2, cnabId: 3, produtoId: 3 },
      { id: 19, bancoId: 3, cnabId: 1, produtoId: 1 },
      { id: 20, bancoId: 3, cnabId: 2, produtoId: 1 },
      { id: 21, bancoId: 4, cnabId: 1, produtoId: 2 },
      { id: 22, bancoId: 4, cnabId: 1, produtoId: 3 },
      { id: 23, bancoId: 4, cnabId: 1, produtoId: 4 },
      { id: 24, bancoId: 5, cnabId: 1, produtoId: 1 },
      { id: 25, bancoId: 5, cnabId: 1, produtoId: 2 },
      { id: 26, bancoId: 5, cnabId: 1, produtoId: 4 },
      { id: 27, bancoId: 5, cnabId: 2, produtoId: 1 },
      { id: 28, bancoId: 5, cnabId: 2, produtoId: 2 },
      { id: 29, bancoId: 5, cnabId: 2, produtoId: 4 },
    ],
    skipDuplicates: true,
  });

  console.log('Seed de bancos, produtos e serviços concluída!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });