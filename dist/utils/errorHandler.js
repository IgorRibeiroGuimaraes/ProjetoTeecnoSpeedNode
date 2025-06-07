"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratarErroInterno = tratarErroInterno;
function tratarErroInterno(rep, error) {
    const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido';
    rep.log.error(error);
    return rep.status(500).send({
        erro: 'Erro interno do servidor.',
        detalhe: mensagemErro,
    });
}
