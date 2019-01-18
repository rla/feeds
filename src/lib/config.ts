import fs from 'fs';
import path from 'path';

type User = {
    user: string,
    pass: string
};

type Config = {
    db: string,
    requests: number,
    polltime: number,
    timeout: number,
    auth: ReadonlyArray<User>,
    sessionSecret: string,
    title: string,
    version: string
};

const config = JSON.parse(fs.readFileSync(path.join(
    __dirname, '..', '..', 'config.json'), 'utf8')) as Config;

const packageData = JSON.parse(fs.readFileSync(path.join(
    __dirname, '..', '..', 'config.json'), 'utf8'));

config.version = packageData.version as string;

export default config as Readonly<Config>;
