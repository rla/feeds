"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runUpdate_1 = __importDefault(require("./runUpdate"));
/**
 * Starts to pull newsfeeds periodically.
 */
exports.default = async (config, database) => {
    if (config.polltime < 60) {
        throw new Error('Poll time must be at least 60 seconds.');
    }
    return setInterval(async () => {
        await runUpdate_1.default(database);
    }, config.polltime * 1000);
};
//# sourceMappingURL=periodicFetch.js.map