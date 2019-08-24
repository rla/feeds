import sqlite from 'sqlite';
import PromiseQueue from 'promise-queue';

// tslint:disable: no-any

/**
 * Transaction-scoped queries.
 */
export type Transaction = {
  run: (sql: string, ...params: any[]) => Promise<void>;
  all: (sql: string, ...params: any[]) => Promise<any[]>;
};

/**
 * Transaction provider. Has a single method that accepts
 * a function and provides a transaction to this function.
 */
export type Database = {
  transaction: <T>(fn: (tx: Transaction) => Promise<T>) => Promise<T>;
};

// Keeps prepared statements.
// These have to be finalized before
// connection can be closed.
type PrepareMap = Map<string, sqlite.Statement>;

/**
 * Helper class for objects that hold opened SQLite database.
 * Queries are serialized through a queue to ensure that
 * statements from different transaction won't interleave.
 */
export class SqliteDatabase implements Transaction, Database {
  public filename: string;
  public sqlite: sqlite.Database;
  public prepared: PrepareMap;
  public queue: PromiseQueue;

  constructor(filename: string) {
    this.filename = filename;
    this.prepared = new Map<string, sqlite.Statement>();
    this.queue = new PromiseQueue(1);
  }

  /**
   * Opens the database.
   */
  async open() {
    this.sqlite = await sqlite.open(this.filename);
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
  async prepare(sql: string): Promise<sqlite.Statement> {
    const prepared = this.prepared;
    if (prepared.has(sql)) {
      return prepared.get(sql) as sqlite.Statement;
    }
    const statement = await this.sqlite.prepare(sql);
    prepared.set(sql, statement);
    return statement;
  }

  async run(sql: string, ...params: any[]) {
    const st = await this.prepare(sql);
    await st.run(...params);
  }

  async all(sql: string, ...params: any[]) {
    const st = await this.prepare(sql);
    return st.all(...params);
  }

  /**
   * Runs the given async function through queue and wraps
   * it into a transaction.
   */
  transaction<T>(fn: (runner: Transaction) => Promise<T>) {
    const wrapper = async (): Promise<T> => {
      try {
        await this.sqlite.run('BEGIN TRANSACTION');
        const ret = await fn(this);
        await this.sqlite.run('COMMIT TRANSACTION');
        return ret;
      } catch (err) {
        await this.sqlite.run('ROLLBACK TRANSACTION');
        throw err;
      }
    };
    return this.queue.add(wrapper);
  }
}
