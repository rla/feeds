"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
/**
 * Saves a new article.
 */
exports.save = async (tx, article) => {
    const sql = 'INSERT INTO article' +
        ' (uuid, feed, id, title, link, published, fetch_time)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?)';
    if (isNaN(article.date.getTime())) {
        article.date = new Date();
    }
    // Uses UNIX timestamps.
    const published = Math.floor(article.date.getTime() / 1000);
    const fetchTime = Math.floor(Date.now() / 1000);
    await tx.run(sql, uuid_1.default.v4(), article.feedUuid, article.id, article.title, article.link, published, fetchTime);
};
/**
 * All articles, sorted by rowid.
 */
exports.all = async (tx, rowid, count) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE article_rowid < ? ' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count);
};
/**
 * All unread articles, sorted by rowid.
 */
exports.unread = async (tx, rowid, count) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_read = 0 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count);
};
/**
 * Retrieves unseen articles, sorted by rowid.
 */
exports.unseen = async (tx, rowid, count) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_seen = 0 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count);
};
/**
 * Reads top important articles, sorted by rowid.
 */
exports.important = async (tx, rowid, count) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE is_important = 1 AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, rowid, count);
};
/**
 * All articles from the given feed, sorted by rowid.
 */
exports.feed = async (tx, feed, rowid, count) => {
    const sql = 'SELECT * FROM article_with_feed' +
        ' WHERE feed = ? AND article_rowid < ?' +
        ' ORDER BY article_rowid DESC LIMIT ?';
    return tx.all(sql, feed, rowid, count);
};
/**
 * Searches articles by title.
 */
exports.search = async (tx, words, rowid, count) => {
    if (words.length === 0) {
        return [];
    }
    else {
        // tslint:disable-next-line:no-any
        const params = words.map(word => `%${word}%`);
        params.unshift(rowid);
        params.push(count);
        const conditions = words.map(() => 'title LIKE ?');
        // TODO: string interpolation.
        const sql = 'SELECT * FROM article_with_feed' +
            ' WHERE article_rowid < ? AND ' +
            conditions.join(' AND ') +
            ' ORDER BY article_rowid DESC LIMIT ?';
        params.unshift(sql);
        return tx.all.apply(tx, params);
    }
};
/**
 * Marks article read. Automatically marks it seen too.
 */
exports.markRead = async (tx, uuid, read) => {
    const sqlRead = 'UPDATE article SET is_read = ? WHERE uuid = ?';
    const sqlSeen = 'UPDATE article SET is_seen = ? WHERE uuid = ?';
    await tx.run(sqlRead, read ? 1 : 0, uuid);
    await tx.run(sqlSeen, 1, uuid);
};
/**
 * Marks feed read.
 */
exports.markFeedRead = async (tx, uuid) => {
    const sql = 'UPDATE article SET is_read = 1 WHERE feed = ?';
    await tx.run(sql, uuid);
};
/**
 * Marks article seen.
 */
exports.markFeedSeen = async (tx, uuid) => {
    const sql = 'UPDATE article SET is_seen = 1 WHERE feed = ?';
    await tx.run(sql, uuid);
};
/**
 * Marks article important.
 */
exports.markImportant = async (tx, uuid, important) => {
    const sql = 'UPDATE article SET is_important = ? WHERE uuid = ?';
    tx.run(sql, important ? 1 : 0, uuid);
};
/**
 * Marks all given articles as seen.
 */
exports.markSeen = async (tx, uuids) => {
    const sql = 'UPDATE article SET is_seen = ? WHERE uuid = ?';
    for (const uuid of uuids) {
        await tx.run(sql, 1, uuid);
    }
};
/**
 * Removes all articles of the given feed.
 */
exports.removeFeed = async (tx, uuid) => {
    const sql = 'DELETE FROM article WHERE feed = ?';
    await tx.run(sql, uuid);
};
//# sourceMappingURL=article.js.map