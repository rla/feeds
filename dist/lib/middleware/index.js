"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const buster_1 = __importDefault(require("./buster"));
const cookies_1 = __importDefault(require("./cookies"));
const session_1 = __importDefault(require("./session"));
exports.default = (app, config) => {
    app.use(buster_1.default());
    let staticOptions = {};
    if (process.env.NODE_ENV === 'production') {
        staticOptions = { maxAge: '30d' };
    }
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', '..', 'public'), staticOptions));
    app.use(cookies_1.default(config));
    app.use(session_1.default());
};
//# sourceMappingURL=index.js.map