import {
    loadInitial,
    INVALID_LOADED,
    INVALID_INITIAL,
    load,
    deleteFeed,
    resolveFeed,
    INVALID_FEED_RESOLVED
} from './invalid';
import mockStore from '../testing/mockStore';

it('dispatches the loadInitial action', async () => {
    const store = mockStore({ invalid: { start: 0 } });
    await store.dispatch(loadInitial());
    const actions = store.getActions();
    expect(actions).toEqual([
        { type: INVALID_INITIAL },
        { type: INVALID_LOADED, feeds: [] }
    ]);
});

it('dispatches the load action', async () => {
    const store = mockStore({ invalid: { start: 0 } });
    await store.dispatch(load());
    const actions = store.getActions();
    expect(actions).toEqual([
        { type: INVALID_LOADED, feeds: [] }
    ]);
});

it('dispatches the deleteFeed action', async () => {
    const store = mockStore({ invalid: { start: 0 } });
    await store.dispatch(deleteFeed('e4161d28-1e43-11e9-ab14-d663bd873d93'));
    const actions = store.getActions();
    expect(actions).toEqual([
        { type: INVALID_INITIAL },
        { type: INVALID_LOADED, feeds: [] }
    ]);
});

it('dispatches the resolveFeed action', async () => {
    const store = mockStore({ invalid: { start: 0 } });
    await store.dispatch(resolveFeed('e4161d28-1e43-11e9-ab14-d663bd873d93'));
    const actions = store.getActions();
    expect(actions).toEqual([
        { type: INVALID_FEED_RESOLVED, feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
    ]);
});
