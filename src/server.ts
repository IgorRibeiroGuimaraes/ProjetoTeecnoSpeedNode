import fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import cookie from "@fastify/cookie"; 
import dotenv from "dotenv";
import { createVanLetterRoute } from "./routes/createVanLetter";
import { updateVanLetterRoute } from "./routes/updateVanLetter";
import { authRoutes } from "./routes/authRoutes"; 
import { sendVanLetterRoutes } from "./routes/sendVanLetter";
import { getServiceRoute } from "./routes/getService";
import { bancoConfiguracoesRoutes } from "./routes/bancoConfiguracoesRoutes";
import cors from "@fastify/cors";
import { cartaRoutes } from "./routes/listCnpjLetter";
import { updateAndGenerateVanLettrePDF } from "./routes/generateVanLetterPDF";

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

app.register(cors, {
  origin: process.env.WEB_BASE_URL || "*", // Puxa a URL do front-end do .env ou permite todas as origens como fallback
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permite cookies e cabeçalhos de autenticação
});

// Registra as rotas
app.register(createVanLetterRoute);
app.register(updateVanLetterRoute);
app.register(authRoutes);
app.register(sendVanLetterRoutes)
app.register(updateAndGenerateVanLettrePDF)
app.register(getServiceRoute)
app.register(bancoConfiguracoesRoutes)
app.register(cartaRoutes)

// Tratamento de erros global
app.setErrorHandler((error, req, rep) => {
  console.error("Erro:", error);
  rep.status(500).send({ error: "Erro interno do servidor" });
});

// Inicia o servidor
const PORT = Number(process.env.PORT) || 3000;

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server running `);
});
