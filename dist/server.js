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
const getProducts_1 = require("./routes/getProducts");
const updateVanLetter_1 = require("./routes/updateVanLetter");
const getBankList_1 = require("./routes/getBankList");
const authRoutes_1 = require("./routes/authRoutes");
const sendVanLetter_1 = require("./routes/sendVanLetter");
const generateVanLetterPDF_1 = require("./routes/generateVanLetterPDF");
const updateCartaServico_1 = require("./routes/updateCartaServico");
const getService_1 = require("./routes/getService");
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
        sameSite: "strict", // Proteção contra CSRF
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
// Registra as rotas
app.register(createVanLetter_1.createVanLetterRoute);
app.register(getProducts_1.getProductsRoute);
app.register(updateVanLetter_1.updateVanLetterRoute);
app.register(getBankList_1.getBankListRoutes);
app.register(authRoutes_1.authRoutes);
app.register(sendVanLetter_1.sendVanLetterRoutes);
app.register(generateVanLetterPDF_1.generateVanLetterPDFRoute);
app.register(updateCartaServico_1.updateCartaServicoRoute);
app.register(getService_1.getServiceRoute);
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
