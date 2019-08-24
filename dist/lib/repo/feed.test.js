"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feed_1 = require("./feed");
const db_1 = __importDefault(require("../../testing/mock/db"));
it('should execute the add query', async () => {
    const fn = jest.fn();
    await feed_1.add(db_1.default(['item'], fn), 'http://example.com');
    expect(fn).toBeCalled();
});
it('should execute the addAll query', async () => {
    const fn = jest.fn();
    await feed_1.addAll(db_1.default(['item'], fn), ['http://example.com']);
    expect(fn).toBeCalled();
});
it('should execute the all query', async () => {
    const results = await feed_1.all(db_1.default(['item'], jest.fn()));
    expect(results).toEqual(['item']);
});
it('should execute the allStat query', async () => {
    const results = await feed_1.allStat(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the clearErrors query', async () => {
    const fn = jest.fn();
    await feed_1.clearErrors(db_1.default(['item'], fn));
    expect(fn).toBeCalled();
});
it('should execute the invalid query', async () => {
    const results = await feed_1.invalid(db_1.default(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});
it('should execute the mark query', async () => {
    const fn = jest.fn();
    await feed_1.mark(db_1.default(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'invalid feed');
    expect(fn).toBeCalled();
});
it('should execute the mark query', async () => {
    const fn = jest.fn();
    await feed_1.mark(db_1.default(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'invalid feed');
    expect(fn).toBeCalled();
});
it('should execute the remove query', async () => {
    const fn = jest.fn();
    await feed_1.remove(db_1.default(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});
it('should execute the resolve query', async () => {
    const fn = jest.fn();
    await feed_1.resolve(db_1.default(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});
it('should execute the updateTitle query', async () => {
    const fn = jest.fn();
    await feed_1.updateTitle(db_1.default(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'New feed title');
    expect(fn).toBeCalled();
});
//# sourceMappingURL=feed.test.js.map