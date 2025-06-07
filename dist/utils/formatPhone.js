"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhone = formatPhone;
function formatPhone(phone) {
    return phone.replace(/\D/g, '');
}
