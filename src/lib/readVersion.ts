import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);

/**
 * Reads current application version from the
 * package.json file.
 */
export default async () => {
    const json = await readFile(path.join(__dirname, '..', '..', 'package.json'), 'utf8');
    return JSON.parse(json).version;
};
