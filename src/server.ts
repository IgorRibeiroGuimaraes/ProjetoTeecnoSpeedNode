import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import cookie from "@fastify/cookie"; 
import dotenv from "dotenv";
import { createVanLetterRoute } from "./routes/createVanLetter";
import { getProductsRoute } from "./routes/getProducts";
import { updateVanLetterRoute } from "./routes/updateVanLetter";
import { getBankListRoutes } from "./routes/getBankList";
import { authRoutes } from "./routes/authRoutes"; 
import { sendVanLetterRoutes } from "./routes/sendVanLetter";
import { generateVanLetterPDFRoute } from "./routes/generateVanLetterPDF";
import { updateCartaServicoRoute } from "./routes/updateCartaServico";
import { getServiceRoute } from "./routes/getService";

dotenv.config(); // Carrega as variáveis de ambiente do .env

const app = fastify({
  ajv: {
    customOptions: {
      strict: false,
    },
  },
});

// Registra o plugin de cookies
app.register(cookie, {
  secret: process.env.COOKIE_SECRET || "seu-segredo-de-cookie", // Segredo para assinar cookies
  parseOptions: {
    httpOnly: true, // Cookies HTTP-only
    secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
    sameSite: "strict", // Proteção contra CSRF
  },
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

// Registra as rotas
app.register(createVanLetterRoute);
app.register(getProductsRoute);
app.register(updateVanLetterRoute);
app.register(getBankListRoutes);
app.register(authRoutes);
app.register(sendVanLetterRoutes)
app.register(generateVanLetterPDFRoute)
app.register(updateCartaServicoRoute)
app.register(getServiceRoute)

// Tratamento de erros global
app.setErrorHandler((error, req, rep) => {
  console.error("Erro:", error);
  rep.status(500).send({ error: "Erro interno do servidor" });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT) }).then(() => {
  console.log(`🚀 Server running `);
});