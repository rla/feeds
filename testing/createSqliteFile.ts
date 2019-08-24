import fs from 'fs';
import path from 'path';
import util from 'util';
import { spawn } from 'child_process';

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const exists = util.promisify(fs.exists);

const SCHEMA_DIR = path.join(__dirname, '..', 'schema');
const MIGRATIONS_DIR = path.join(SCHEMA_DIR, 'migrations');

/**
 * Creates database with test data in the given file.
 */
export default async (filename: string, dataFilename: string) => {
  if (await exists(filename)) {
    await unlink(filename);
  }
  const schema = await readFile(path.join(SCHEMA_DIR, 'schema.sql'), 'utf8');
  const migrations = await readDir(MIGRATIONS_DIR);
  migrations.sort();
  let wholeSchema = schema;
  for (const migration of migrations) {
    wholeSchema += '\r\n' + (await readFile(path.join(MIGRATIONS_DIR, migration), 'utf8'));
  }
  wholeSchema += '\r\n' + (await readFile(dataFilename, 'utf8'));
  return runSqlite(filename, wholeSchema);
};

const runSqlite = async (filename: string, schema: string) => {
  return new Promise((resolve, reject) => {
    const proc = spawn('sqlite3', [filename]);
    proc.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Test database creation failed.`));
      }
    });
    proc.stderr.on('data', message => {
      process.stderr.write(message);
    });
    proc.stdin.write(schema);
    proc.stdin.end();
  });
};
