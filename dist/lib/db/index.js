"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = __importDefault(require("sqlite"));
const promise_queue_1 = __importDefault(require("promise-queue"));
/**
 * Helper class for objects that hold opened SQLite database.
 * Queries are serialized through a queue to ensure that
 * statements from different transaction won't interleave.
 */
class SqliteDatabase {
    constructor(filename) {
        this.filename = filename;
        this.prepared = new Map();
        this.queue = new promise_queue_1.default(1);
    }
    /**
     * Opens the database.
     */
    async open() {
        this.sqlite = await sqlite_1.default.open(this.filename);
    }
    /**
     * Closes the database.
     */
    async close() {
        for (const st of this.prepared.values()) {
            await st.finalize();
        }
        await this.sqlite.close();
    }
    /**
     * Prepares the statement.
     */
    async prepare(sql) {
        const prepared = this.prepared;
        if (prepared.has(sql)) {
            return prepared.get(sql);
        }
        const statement = await this.sqlite.prepare(sql);
        prepared.set(sql, statement);
        return statement;
    }
    async run(sql, ...params) {
        const st = await this.prepare(sql);
        await st.run(...params);
    }
    async all(sql, ...params) {
        const st = await this.prepare(sql);
        return st.all(...params);
    }
    /**
     * Runs the given async function through queue and wraps
     * it into a transaction.
     */
    transaction(fn) {
        const wrapper = async () => {
            try {
                await this.sqlite.run('BEGIN TRANSACTION');
                const ret = await fn(this);
                await this.sqlite.run('COMMIT TRANSACTION');
                return ret;
            }
            catch (err) {
                await this.sqlite.run('ROLLBACK TRANSACTION');
                throw err;
            }
        };
        return this.queue.add(wrapper);
    }
}
exports.SqliteDatabase = SqliteDatabase;
//# sourceMappingURL=index.js.map