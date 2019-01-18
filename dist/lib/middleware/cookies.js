"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = __importDefault(require("cookies"));
const config_1 = __importDefault(require("../config"));
// Application-specific cookie handling.
if (!config_1.default.sessionSecret) {
    throw new Error('Session key is not set.');
}
exports.default = () => {
    return (req, res, next) => {
        req.cookies = new cookies_1.default(req, res, { keys: [config_1.default.sessionSecret] });
        next();
    };
};
//# sourceMappingURL=cookies.js.map