import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import dotenv from "dotenv";
import { createVanLetterRoute } from "./routes/createVanLetter";
import { getProductsRoute } from "./routes/getProducts";

dotenv.config(); // Carrega as variáveis de ambiente do .env

const app = fastify({
  ajv: {
    customOptions: {
      strict: false
    }
  }
});

// Configuração do Swagger (Documentação da API)
app.register(swagger, {
  swagger: {
    info: {
      title: "API de Cartas VAN",
      description: "Documentação da API de Cartas VAN",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs", 
});

// Registra a rota de criação de Carta VAN
app.register(createVanLetterRoute);

app.register(getProductsRoute)

// Tratamento de erros global
app.setErrorHandler((error, request, reply) => {
  console.error("Erro:", error);
  reply.status(500).send({ error: "Erro interno do servidor" });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT) }).then(() => {
  console.log(`🚀 Server running !!`);
});