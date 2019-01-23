"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const readFile = util_1.default.promisify(fs_1.default.readFile);
/**
 * Reads current application version from the
 * package.json file.
 */
exports.default = async () => {
    const json = await readFile(path_1.default.join(__dirname, '..', '..', 'package.json'), 'utf8');
    return JSON.parse(json).version;
};
//# sourceMappingURL=readVersion.js.map