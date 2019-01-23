import fs from 'fs';

export type User = {
    user: string,
    pass: string
};

export type Config = {
    db: string,
    requests: number,
    polltime: number,
    timeout: number,
    auth: User[],
    sessionSecret: string,
    title: string,
    version: string
};

/**
 * Reads the application configuration from the given file.
 * Version arguments sets the version property on the returned
 * configuration object.
 */
export const readConfig = async (filename: string, version: string) => {
    const config = JSON.parse(fs.readFileSync(filename, 'utf8')) as Config;
    config.version = version;
    return config as Readonly<Config>;
};
