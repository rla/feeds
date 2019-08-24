"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * Reads the application configuration from the given file.
 * Version arguments sets the version property on the returned
 * configuration object.
 */
exports.readConfig = async (filename, version) => {
    const config = JSON.parse(fs_1.default.readFileSync(filename, 'utf8'));
    config.version = version;
    if (config.allowAnonymousReadonly === undefined) {
        config.allowAnonymousReadonly = false;
    }
    return config;
};
//# sourceMappingURL=readConfig.js.map