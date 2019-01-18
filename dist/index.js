"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const commander_1 = __importDefault(require("commander"));
const express_1 = __importDefault(require("express"));
const ejs_1 = __importDefault(require("./lib/ejs"));
const middleware_1 = __importDefault(require("./lib/middleware"));
const handler_1 = __importDefault(require("./lib/handler"));
const db = __importStar(require("./lib/db"));
const logger = __importStar(require("./lib/logger"));
const service = __importStar(require("./lib/service"));
const config_1 = __importDefault(require("./lib/config"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('app');
commander_1.default.version(config_1.default.version);
commander_1.default.option('-f, --fetch', 'Runs fetch process right at start.');
commander_1.default.parse(process.argv);
const runFetch = async () => {
    logger.info('Single-time feed update triggered.');
    await service.update();
    logger.info('Finished feed update.');
    process.exit(0);
};
const setupPeridocFetch = async () => {
    if (config_1.default.polltime < 60) {
        throw new Error('Poll time must be at least 60 seconds.');
    }
    setInterval(async () => {
        logger.info('Updating feed.');
        await service.update();
        logger.info('Update finished.');
    }, config_1.default.polltime * 1000);
};
const startServer = async () => {
    // Set up the express app.
    const app = express_1.default();
    // Set up templating.
    ejs_1.default(app);
    // Generic middleware stack.
    middleware_1.default(app);
    // Set up handlers.
    handler_1.default(app);
    // Starts the server.
    app.set('port', process.env.PORT || 3330);
    app.listen(app.get('port'), () => {
        logger.info('Express web server is started.');
    });
};
const runMain = async () => {
    if (commander_1.default.fetch) {
        await runFetch();
    }
    else {
        await setupPeridocFetch();
        await startServer();
    }
};
(async () => {
    try {
        await db.open(config_1.default.db);
        await runMain();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map