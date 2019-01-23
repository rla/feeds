"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const front_1 = __importDefault(require("./front"));
/**
 * Sets up all application routes.
 */
exports.default = (app, config, database) => {
    api_1.default(app, config, database);
    front_1.default(app, config);
};
//# sourceMappingURL=index.js.map