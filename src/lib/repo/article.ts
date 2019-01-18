import uuidGenerator from 'uuid';
import { Transaction } from '../db';
import { FeedArticle, ArticleFeedRow } from '../data';

/**
 * Saves a new article.
 */
export const save = async (tx: Transaction, article: FeedArticle) => {

    const sql = 'INSERT INTO article' +
        ' (uuid, feed, id, title, link, published, fetch_time)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?)';

    if (isNaN(article.date.getTime())) {
        article.date = new Date();
    }

    // Uses UNIX timestamps.

    const published = Math.floor(article.date.getTime() / 1000);
    const fetchTime = Math.floor(Date.now() / 1000);

    await tx.run(sql, uuidGenerator.v4(), article.feedUuid, article.id,
        article.title, article.link, published, fetchTime);
};

/**
 * All articles, sorted by rowid.
 */
export const all = async (tx: Transaction, rowid: number, count: number) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE article_rowid < ? ' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count) as Promise<ArticleFeedRow[]>;
};

/**
 * All unread articles, sorted by rowid.
 */
export const unread = async (tx: Transaction, rowid: number, count: number) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_read = 0 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count) as Promise<ArticleFeedRow[]>;
};

/**
 * Retrieves unseen articles, sorted by rowid.
 */
export const unseen = async (tx: Transaction, rowid: number, count: number) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_seen = 0 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count) as Promise<ArticleFeedRow[]>;
};

/**
 * Reads top important articles, sorted by rowid.
 */
export const important = async (tx: Transaction, rowid: number, count: number) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_important = 1 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count) as Promise<ArticleFeedRow[]>;
};

/**
 * All articles from the given feed, sorted by rowid.
 */
export const feed = async (tx: Transaction, feed: string, rowid: number, count: number) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE feed = ? AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, feed, rowid, count) as Promise<ArticleFeedRow[]>;
};

/**
 * Searches articles by title.
 */
export const search = async (tx: Transaction, words: string[], rowid: number, count: number) => {
    if (words.length === 0) {
        return [];
    } else {
        // tslint:disable-next-line:no-any
        const params = words.map((word) => `%${word}%`) as any[];
        params.unshift(rowid);
        params.push(count);
        const conditions = words.map(() => 'title LIKE ?');
        // TODO: string interpolation.
        const sql = 'SELECT * FROM article_with_feed' +
            ' WHERE article_rowid < ? AND ' + conditions.join(' AND ') +
            ' ORDER BY article_rowid DESC LIMIT ?';
        params.unshift(sql);
        return tx.all.apply(tx, params) as Promise<ArticleFeedRow[]>;
    }
};

/**
 * Marks article read. Automatically marks it seen too.
 */
export const markRead = async (tx: Transaction, uuid: string, read: boolean) => {
    const sqlRead = 'UPDATE article SET is_read = ? WHERE uuid = ?';
    const sqlSeen = 'UPDATE article SET is_seen = ? WHERE uuid = ?';
    await tx.run(sqlRead, read ? 1 : 0, uuid);
    await tx.run(sqlSeen, 1, uuid);
};

/**
 * Marks feed read.
 */
export const markFeedRead = async (tx: Transaction, uuid: string) => {
    const sql = 'UPDATE article SET is_read = 1 WHERE feed = ?';
    await tx.run(sql, uuid);
};

/**
 * Marks article seen.
 */
export const markFeedSeen = async (tx: Transaction, uuid: string) => {
    const sql = 'UPDATE article SET is_seen = 1 WHERE feed = ?';
    await tx.run(sql, uuid);
};

/**
 * Marks article important.
 */
export const markImportant = async (tx: Transaction, uuid: string, important: boolean) => {
    const sql = 'UPDATE article SET is_important = ? WHERE uuid = ?';
    tx.run(sql, important ? 1 : 0, uuid);
};

/**
 * Marks all given articles as seen.
 */
export const markSeen = async (tx: Transaction, uuids: string[]) => {
    const sql = 'UPDATE article SET is_seen = ? WHERE uuid = ?';
    for (const uuid of uuids) {
        await tx.run(sql, uuid);
    }
};

/**
 * Removes all articles of the given feed.
 */
export const removeFeed = async (tx: Transaction, uuid: string) => {
    const sql = 'DELETE FROM article WHERE feed = ?';
    await tx.run(sql, uuid);
};
