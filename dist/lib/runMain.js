"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const runUpdate_1 = __importDefault(require("./runUpdate"));
const readVersion_1 = __importDefault(require("./readVersion"));
const parseOptions_1 = __importDefault(require("./parseOptions"));
const readConfig_1 = require("./readConfig");
const runServer_1 = __importDefault(require("./runServer"));
const periodicFetch_1 = __importDefault(require("./periodicFetch"));
/**
 * Runs the application.
 */
exports.default = async (argv) => {
    const options = parseOptions_1.default(argv);
    const version = await readVersion_1.default();
    const configFile = options.configFile || path_1.default.join(__dirname, '..', '..', 'config.json');
    const config = await readConfig_1.readConfig(configFile, version);
    const database = new db_1.SqliteDatabase(config.db);
    await database.open();
    if (options.fetch) {
        await runUpdate_1.default(database, configFile);
        await database.close();
    }
    else {
        await periodicFetch_1.default(config, database, configFile);
        await runServer_1.default(config, database);
    }
};
//# sourceMappingURL=runMain.js.map