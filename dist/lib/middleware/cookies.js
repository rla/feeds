"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = __importDefault(require("cookies"));
/**
 * Application-specific cookie handling.
 */
exports.default = (config) => {
    if (!config.sessionSecret) {
        throw new Error('Session key is not set.');
    }
    return (req, res, next) => {
        req.cookies = new cookies_1.default(req, res, { keys: [config.sessionSecret] });
        next();
    };
};
//# sourceMappingURL=cookies.js.map