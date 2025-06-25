# Projeto TecnoSpeed Node

Este projeto é uma API Node.js para gestão de Cartas VAN, integração bancária e geração de documentos, utilizando Prisma ORM, Fastify e PostgreSQL.

## Funcionalidades

- Cadastro e consulta de Cartas VAN
- Geração de PDFs e upload para Supabase
- Integração com bancos e produtos
- Autenticação de rotas
- Documentação automática via Swagger

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Supabase Storage
- Zod (validação)
- Swagger (OpenAPI)

## Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/IgorRibeiroGuimaraes/ProjetoTeecnoSpeedNode.git
   cd ProjetoTeecnoSpeedNode
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure o banco de dados**
   - Edite o arquivo `.env` com sua `DATABASE_URL` do PostgreSQL.

4. **Rode as migrações**
   ```sh
   npx prisma migrate dev
   ```

5. **Popule o banco com a seed**
   ```sh
   npx ts-node prisma/seed.ts
   ```

6. **Inicie o servidor**
   ```sh
   npm run dev
   ```

7. **Acesse a documentação**
   - Normalmente disponível em: `http://localhost:3000/docs`

## Scripts úteis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npx prisma studio` — Interface visual para o banco de dados
- `npx prisma migrate dev` — Executa as migrações

## Estrutura de Pastas

- `src/controllers` — Controllers das rotas
- `src/services` — Lógica de negócio
- `src/schemas` — Schemas de validação e Swagger
- `src/routes` — Definição das rotas Fastify
- `prisma` — Schema e seeds do banco de dados

## Observações

- Certifique-se de que o PostgreSQL está rodando localmente.
- O Supabase é utilizado para armazenamento de arquivos PDF.
- O projeto utiliza autenticação nas rotas protegidas.

## Licença

MIT

---

Projeto desenvolvido por Igor Guimarães,Heder Lucas, Henrique Cosntatino, Luiz Henrique, Kellmi Cristian e Dayane Rodrigues  
[Repositório no GitHub](https://github.com/IgorRibeiroGuimaraes/ProjetoTeecnoSpeedNode.git)