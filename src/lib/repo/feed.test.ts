import {
    add,
    addAll,
    all,
    allStat,
    clearErrors,
    invalid,
    mark,
    remove,
    resolve,
    updateTitle
} from './feed';
import db from '../../testing/mock/db';

it('should execute the add query', async () => {
    const fn = jest.fn();
    await add(db(['item'], fn), 'http://example.com');
    expect(fn).toBeCalled();
});

it('should execute the addAll query', async () => {
    const fn = jest.fn();
    await addAll(db(['item'], fn), ['http://example.com']);
    expect(fn).toBeCalled();
});

it('should execute the all query', async () => {
    const results = await all(db(['item'], jest.fn()));
    expect(results).toEqual(['item']);
});

it('should execute the allStat query', async () => {
    const results = await allStat(db(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});

it('should execute the clearErrors query', async () => {
    const fn = jest.fn();
    await clearErrors(db(['item'], fn));
    expect(fn).toBeCalled();
});

it('should execute the invalid query', async () => {
    const results = await invalid(db(['item'], jest.fn()), 0, 30);
    expect(results).toEqual(['item']);
});

it('should execute the mark query', async () => {
    const fn = jest.fn();
    await mark(db(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'invalid feed');
    expect(fn).toBeCalled();
});

it('should execute the mark query', async () => {
    const fn = jest.fn();
    await mark(db(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'invalid feed');
    expect(fn).toBeCalled();
});

it('should execute the remove query', async () => {
    const fn = jest.fn();
    await remove(db(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});

it('should execute the resolve query', async () => {
    const fn = jest.fn();
    await resolve(db(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
    expect(fn).toBeCalled();
});

it('should execute the updateTitle query', async () => {
    const fn = jest.fn();
    await updateTitle(db(['item'], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', 'New feed title');
    expect(fn).toBeCalled();
});
