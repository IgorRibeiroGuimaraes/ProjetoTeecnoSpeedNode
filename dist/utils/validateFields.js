"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposObrigatorios = validarCamposObrigatorios;
function validarCamposObrigatorios(campos) {
    for (const [campo, valor] of Object.entries(campos)) {
        if (!valor) {
            return `Campo não encontrado: ${campo}`;
        }
    }
    return null;
}
