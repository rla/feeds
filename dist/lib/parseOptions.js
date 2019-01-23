"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parses command line options into an Options instance.
 */
exports.default = (argv) => {
    const fetch = argv.indexOf('-f') >= 0;
    const configIndex = argv.indexOf('-c');
    let configFile;
    if (configIndex >= 0 && argv.length >= configIndex) {
        configFile = argv[configIndex + 1];
    }
    return { fetch, configFile };
};
//# sourceMappingURL=parseOptions.js.map