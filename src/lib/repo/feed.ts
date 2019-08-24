import uuidGenerator from 'uuid';
import { Transaction } from '../db';
import { FeedRow, FeedStatRow } from '../data';

/**
 * Updates title.
 */
export const updateTitle = async (tx: Transaction, uuid: string, title: string) => {
  const sql = 'UPDATE feed SET title = ? WHERE uuid = ?';
  await tx.run(sql, title, uuid);
};

/**
 * Adds new feed url.
 */
export const add = async (tx: Transaction, url: string) => {
  const sql = 'INSERT INTO feed (uuid, url, title) VALUES (?, ?, ?)';
  await tx.run(sql, uuidGenerator.v4(), url, url);
};

/**
 * Adds array of urls.
 */
export const addAll = async (tx: Transaction, urls: string[]) => {
  for (const url of urls) {
    await add(tx, url);
  }
};

/**
 * Reads all feeds from the Transaction.
 */
export const all = async (tx: Transaction) => {
  const sql = 'SELECT * FROM feed ORDER BY title ASC';
  return tx.all(sql) as Promise<FeedRow[]>;
};

/**
 * Reads all feeds with unread, important and unseen counts.
 */
export const allStat = async (tx: Transaction, start: number, count: number) => {
  const sql = 'SELECT * FROM feed_with_stat' + ' ORDER BY unread DESC, title ASC LIMIT ? OFFSET ?';
  return tx.all(sql, count, start) as Promise<FeedStatRow[]>;
};

/**
 * Reads all invalid feeds.
 */
export const invalid = async (tx: Transaction, start: number, count: number) => {
  const sql = 'SELECT * FROM feed WHERE error IS NOT NULL LIMIT ? OFFSET ?';
  return tx.all(sql, count, start) as Promise<FeedRow[]>;
};

/**
 * Deletes the given feed.
 */
export const remove = async (tx: Transaction, uuid: string) => {
  const sql = 'DELETE FROM feed WHERE uuid = ?';
  await tx.run(sql, uuid);
};

/**
 * Marks feed as erroneous.
 */
export const mark = async (tx: Transaction, uuid: string, err: string) => {
  const sql = 'UPDATE feed SET error = ? WHERE uuid = ?';
  await tx.run(sql, err, uuid);
};

/**
 * Clears errors from feeds.
 */
export const clearErrors = async (tx: Transaction) => {
  const sql = 'UPDATE feed SET error = NULL';
  await tx.run(sql);
};

/**
 * Marks feed error as resolved.
 */
export const resolve = async (tx: Transaction, uuid: string) => {
  const sql = 'UPDATE feed SET error = NULL WHERE uuid = ?';
  await tx.run(sql, uuid);
};
