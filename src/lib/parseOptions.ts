export type Options = {
    fetch: boolean,
    configFile?: string
};

/**
 * Parses command line options into an Options instance.
 */
export default (argv: string[]) => {
    const fetch = argv.indexOf('-f') >= 0;
    const configIndex = argv.indexOf('-c');
    let configFile;
    if (configIndex >= 0 && argv.length >= configIndex) {
        configFile = argv[configIndex + 1];
    }
    return { fetch, configFile };
};
