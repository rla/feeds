"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const front_1 = __importDefault(require("./front"));
exports.default = (app) => {
    api_1.default(app);
    front_1.default(app);
};
//# sourceMappingURL=index.js.map