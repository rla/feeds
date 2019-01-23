import { routeView, routeScroll } from './route';
import mockStore from '../testing/mock/store';
import { ROUTE_VIEW } from './route';
import { ARTICLES_INITIAL, ARTICLES_LOADED } from './articles';

it('dispatches the routeView action', async () => {
    const store = mockStore({ articles: { source: 'unseen' } });
    await store.dispatch(routeView('unseen'));
    const actions = store.getActions();
    expect(actions).toEqual([
        { type: ROUTE_VIEW, view: 'unseen', args: undefined },
        { source: 'unseen', type: ARTICLES_INITIAL },
        { articles: [], type: ARTICLES_LOADED }
    ]);
});

it('dispatches the routeScroll action', async () => {
    const store = mockStore({
        articles: { source: 'unseen' },
        route: { view: 'unseen' }
    });
    await store.dispatch(routeScroll());
    const actions = store.getActions();
    expect(actions).toEqual([
        { articles: [], type: ARTICLES_LOADED }
    ]);
});
