"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        var allowedOrigins = [
            'http://localhost:3000',
            "https://repo-widget-and-api.vercel.app/"
        ];
        this.server.use((0, cors_1.default)({
            origin: function (origin, callback) {
                // allow requests with no origin 
                // (like mobile apps or curl requests)
                if (!origin)
                    return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        }));
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express_1.default.json());
    }
    routes() {
        this.server.use(routes_1.default);
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map