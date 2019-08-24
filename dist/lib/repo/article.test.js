"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("./article");
const db_1 = __importDefault(require("../../testing/mock/db"));
it('should execute the all query', async () => {
    const results = await article_1.all(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the feed query', async () => {
    const results = await article_1.feed(db_1.default(['item'], jest.fn()), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the important query', async () => {
    const results = await article_1.important(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the markFeedsRead query', async () => {
    const fn = jest.fn();
    await article_1.markFeedRead(db_1.default([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});
it('should execute the markFeedSeen query', async () => {
    const fn = jest.fn();
    await article_1.markFeedSeen(db_1.default([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});
it('should execute the markImportant query', async () => {
    const fn = jest.fn();
    await article_1.markImportant(db_1.default([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', true);
    expect(fn).toBeCalled();
});
it('should execute the markRead query', async () => {
    const fn = jest.fn();
    await article_1.markRead(db_1.default([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', true);
    expect(fn).toBeCalled();
});
it('should execute the markSeen query', async () => {
    const fn = jest.fn();
    await article_1.markSeen(db_1.default([], fn), ['e4161d28-1e43-11e9-ab14-d663bd873d93']);
    expect(fn).toBeCalled();
});
it('should execute the removeFeed query', async () => {
    const fn = jest.fn();
    await article_1.removeFeed(db_1.default([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});
it('should execute the save query', async () => {
    const fn = jest.fn();
    const article = {
        date: new Date(),
        feedUuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
        id: 'test',
        link: 'http://example.com',
        title: 'Test Article',
    };
    await article_1.save(db_1.default([], fn), article);
    expect(fn).toBeCalled();
});
it('should execute the search query', async () => {
    const results = await article_1.search(db_1.default(['item'], jest.fn()), ['test'], 0, 20);
    expect(results).toEqual(['item']);
});
it('should execute the unread query', async () => {
    const results = await article_1.unread(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the unseen query', async () => {
    const results = await article_1.unseen(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
//# sourceMappingURL=article.test.js.map