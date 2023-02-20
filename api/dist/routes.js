"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});
routes.post('/send_avaliation', (req, res) => {
    console.log("AQUI TA A REQUISIÇÃO", req.body);
    return res.json({ message: "Você conseguiu enviar a mensagem!", itens: req.body });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map