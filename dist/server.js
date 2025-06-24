"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const dotenv_1 = __importDefault(require("dotenv"));
const createVanLetter_1 = require("./routes/createVanLetter");
const updateVanLetter_1 = require("./routes/updateVanLetter");
const authRoutes_1 = require("./routes/authRoutes");
const sendVanLetter_1 = require("./routes/sendVanLetter");
const getService_1 = require("./routes/getService");
const bancoConfiguracoesRoutes_1 = require("./routes/bancoConfiguracoesRoutes");
const cors_1 = __importDefault(require("@fastify/cors"));
const listCnpjLetter_1 = require("./routes/listCnpjLetter");
const generateVanLetterPDF_1 = require("./routes/generateVanLetterPDF");
dotenv_1.default.config(); // Carrega as variáveis de ambiente do .env
const app = (0, fastify_1.default)({
    ajv: {
        customOptions: {
            strict: false,
        },
    },
});
// Registra o plugin de cookies
app.register(cookie_1.default, {
    secret: process.env.COOKIE_SECRET || "seu-segredo-de-cookie", // Segredo para assinar cookies
    parseOptions: {
        httpOnly: true, // Cookies HTTP-only
        secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
        sameSite: "none", // Permite cookies cross-site
    },
});
// Configuração do Swagger (Documentação da API)
app.register(swagger_1.default, {
    swagger: {
        info: {
            title: "API de Cartas VAN",
            description: "Documentação da API de Cartas VAN",
            version: "1.0.0",
        },
    },
});
app.register(swagger_ui_1.default, {
    routePrefix: "/docs",
});
app.register(cors_1.default, {
    origin: process.env.WEB_BASE_URL || "*", // Puxa a URL do front-end do .env ou permite todas as origens como fallback
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Permite cookies e cabeçalhos de autenticação
});
// Registra as rotas
app.register(createVanLetter_1.createVanLetterRoute);
app.register(updateVanLetter_1.updateVanLetterRoute);
app.register(authRoutes_1.authRoutes);
app.register(sendVanLetter_1.sendVanLetterRoutes);
app.register(generateVanLetterPDF_1.updateAndGenerateVanLettrePDF);
app.register(getService_1.getServiceRoute);
app.register(bancoConfiguracoesRoutes_1.bancoConfiguracoesRoutes);
app.register(listCnpjLetter_1.cartaRoutes);
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
