import { setQuery, SEARCH_SET_QUERY, submit } from './search';
import mockStore from '../testing/mockStore';
import { ROUTE_VIEW } from './route';
import { ARTICLES_INITIAL, ARTICLES_LOADED } from './articles';

it('dispatches the setQuery action', async () => {
    const store = mockStore({});
    await store.dispatch(setQuery('test'));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: SEARCH_SET_QUERY, query: 'test' }]);
});

it('dispatches the submit action', async () => {
    const store = mockStore({ articles: { source: 'unseen' } });
    await store.dispatch(submit());
    const actions = store.getActions();
    expect(actions).toEqual([
        { args: undefined, type: ROUTE_VIEW, view: 'results'},
        { source: 'search', type: ARTICLES_INITIAL },
        { articles: [], type: ARTICLES_LOADED }
    ]);
});
