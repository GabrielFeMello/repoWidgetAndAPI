"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require('dotenv').config();
console.log("URL", process.env.RUN_PORT);
app_1.default.listen(process.env.RUN_PORT);
exports.default = app_1.default;
//# sourceMappingURL=index.js.map