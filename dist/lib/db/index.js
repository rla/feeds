"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = __importDefault(require("sqlite"));
const promise_queue_1 = __importDefault(require("promise-queue"));
const queue = new promise_queue_1.default(1);
let db;
// Keeps prepared statements.
// These have to be finalized before
// connection can be closed.
const prepared = new Map();
const prepare = async (sql) => {
    if (prepared.has(sql)) {
        return prepared.get(sql);
    }
    const statement = await db._sqlite.prepare(sql);
    prepared.set(sql, statement);
    return statement;
};
/**
 * Helper to serialize access to the database. Used
 * for implementing transactions.
 */
const queued = async (fn) => {
    return queue.add(fn);
};
/**
 * Automatically prepares the statement, runs the query,
 * and returns all results.
 */
// tslint:disable-next-line:no-any
const all = async (sql, ...params) => {
    const st = await prepare(sql);
    return st.all(...params);
};
/**
 * Automatically prepares the statement and runs the query.
 */
// tslint:disable-next-line:no-any
const run = async (sql, ...params) => {
    const st = await prepare(sql);
    return st.run(...params);
};
/**
 * Opens the database.
 */
exports.open = async (filename) => {
    db = { _sqlite: await sqlite_1.default.open(filename), run, all };
};
/**
 * Closes the database.
 */
exports.close = async () => {
    for (const st of prepared.values()) {
        await st.finalize();
    }
    await db._sqlite.close();
};
/**
 * Wraps the query or multiple queries into a transaction.
 */
exports.tx = async (fn) => {
    const wrapper = async () => {
        try {
            await db._sqlite.run('BEGIN TRANSACTION');
            const ret = await fn(db);
            await db._sqlite.run('COMMIT TRANSACTION');
            return ret;
        }
        catch (err) {
            await db._sqlite.run('ROLLBACK TRANSACTION');
            throw err;
        }
    };
    return queued(wrapper);
};
//# sourceMappingURL=index.js.map