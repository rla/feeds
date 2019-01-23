import { setQuery, SEARCH_SET_QUERY, submit } from './search';
import mockStore from '../testing/mockStore';

it('dispatches the setQuery action', async () => {
    const store = mockStore({});
    await store.dispatch(setQuery('test'));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: SEARCH_SET_QUERY, query: 'test' }]);
});

it('dispatches the submit action', async () => {
    const store = mockStore({
        articles: { source: 'unseen' },
        search: { query: 'test' }
    });
    await store.dispatch(submit());
    const actions = store.getActions();
    // It dispatches nothing.
    expect(actions).toEqual([]);
});
