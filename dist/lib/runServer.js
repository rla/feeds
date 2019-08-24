"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const setupEJS_1 = __importDefault(require("./setupEJS"));
const middleware_1 = __importDefault(require("./middleware"));
const handler_1 = __importDefault(require("./handler"));
const debug = debug_1.default('app');
/**
 * Starts the server. Returns a promise that is
 * resolved once the server starts.
 */
exports.default = async (config, database) => {
    return new Promise((resolve, reject) => {
        // Set up the express app.
        const app = express_1.default();
        // Set up templating.
        setupEJS_1.default(app);
        // Generic middleware stack.
        middleware_1.default(app, config);
        // Set up handlers.
        handler_1.default(app, config, database);
        // Starts the server.
        app.set('port', process.env.PORT || 3330);
        const server = app.listen(app.get('port'), () => {
            debug('Express web server is started.');
            resolve(server);
        });
    });
};
//# sourceMappingURL=runServer.js.map