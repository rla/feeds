"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
/**
 * Updates title.
 */
exports.updateTitle = async (tx, uuid, title) => {
    const sql = 'UPDATE feed SET title = ? WHERE uuid = ?';
    await tx.run(sql, title, uuid);
};
/**
 * Adds new feed url.
 */
exports.add = async (tx, url) => {
    const sql = 'INSERT INTO feed (uuid, url, title) VALUES (?, ?, ?)';
    await tx.run(sql, uuid_1.default.v4(), url, url);
};
/**
 * Adds array of urls.
 */
exports.addAll = async (tx, urls) => {
    for (const url of urls) {
        await exports.add(tx, url);
    }
};
/**
 * Reads all feeds from the Transaction.
 */
exports.all = async (tx) => {
    const sql = 'SELECT * FROM feed ORDER BY title ASC';
    return tx.all(sql);
};
/**
 * Reads all feeds with unread, important and unseen counts.
 */
exports.allStat = async (tx, start, count) => {
    const sql = 'SELECT * FROM feed_with_stat' + ' ORDER BY unread DESC, title ASC LIMIT ? OFFSET ?';
    return tx.all(sql, count, start);
};
/**
 * Reads all invalid feeds.
 */
exports.invalid = async (tx, start, count) => {
    const sql = 'SELECT * FROM feed WHERE error IS NOT NULL LIMIT ? OFFSET ?';
    return tx.all(sql, count, start);
};
/**
 * Deletes the given feed.
 */
exports.remove = async (tx, uuid) => {
    const sql = 'DELETE FROM feed WHERE uuid = ?';
    await tx.run(sql, uuid);
};
/**
 * Marks feed as erroneous.
 */
exports.mark = async (tx, uuid, err) => {
    const sql = 'UPDATE feed SET error = ? WHERE uuid = ?';
    await tx.run(sql, err, uuid);
};
/**
 * Clears errors from feeds.
 */
exports.clearErrors = async (tx) => {
    const sql = 'UPDATE feed SET error = NULL';
    await tx.run(sql);
};
/**
 * Marks feed error as resolved.
 */
exports.resolve = async (tx, uuid) => {
    const sql = 'UPDATE feed SET error = NULL WHERE uuid = ?';
    await tx.run(sql, uuid);
};
//# sourceMappingURL=feed.js.map