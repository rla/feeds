import sqlite from 'sqlite';
import PromiseQueue from 'promise-queue';

const queue = new PromiseQueue(1);

type Instance = {
    _sqlite: sqlite.Database,
    all: typeof all,
    run: typeof run
};

let db: Instance;

// Keeps prepared statements.
// These have to be finalized before
// connection can be closed.

const prepared = new Map<string, sqlite.Statement>();

const prepare = async (sql: string): Promise<sqlite.Statement> => {
    if (prepared.has(sql)) {
        return prepared.get(sql) as sqlite.Statement;
    }
    const statement = await db._sqlite.prepare(sql);
    prepared.set(sql, statement);
    return statement;
};

/**
 * Helper to serialize access to the database. Used
 * for implementing transactions.
 */
const queued = async <T>(fn: () => Promise<T>) => {
    return queue.add(fn);
};

/**
 * Automatically prepares the statement, runs the query,
 * and returns all results.
 */
// tslint:disable-next-line:no-any
const all = async (sql: string, ...params: any[]) => {
    const st = await prepare(sql);
    return st.all(...params);
};

/**
 * Automatically prepares the statement and runs the query.
 */
// tslint:disable-next-line:no-any
const run = async (sql: string, ...params: any[]) => {
    const st = await prepare(sql);
    await st.run(...params);
};

/**
 * Opens the database.
 */
export const open = async (filename: string) => {
    db = { _sqlite: await sqlite.open(filename), run, all };
};

/**
 * Closes the database.
 */
export const close = async () => {
    for (const st of prepared.values()) {
        await st.finalize();
    }
    await db._sqlite.close();
};

/**
 * Available methods on a single transaction.
 */
export type Transaction = {
    all: typeof all,
    run: typeof run,
};

/**
 * Wraps the query or multiple queries into a transaction.
 */
export const tx = async <T>(fn: (tx: Transaction) => Promise<T>) => {
    const wrapper = async (): Promise<T> => {
        try {
            await db._sqlite.run('BEGIN TRANSACTION');
            const ret = await fn(db);
            await db._sqlite.run('COMMIT TRANSACTION');
            return ret;
        } catch (err) {
            await db._sqlite.run('ROLLBACK TRANSACTION');
            throw err;
        }
    };
    return queued(wrapper);
};
