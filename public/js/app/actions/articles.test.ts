import {
  loadInitial,
  load,
  deleteFeed,
  markSeen,
  markRead,
  markImportant,
  read,
  ARTICLES_INITIAL,
  ARTICLES_LOADED,
  ARTICLES_MARK_SEEN,
  ARTICLES_MARK_READ,
  ARTICLES_TOGGLE_IMPORTANT,
  ARTICLES_TOGGLE_READ,
} from './articles';
import mockStore from '../testing/mock/store';

const mockState = {
  auth: { authenticated: true },
  articles: {
    items: [
      {
        uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
        is_seen: 0,
        is_read: 0,
        is_important: 0,
      },
    ],
  },
};

it('dispatches the loadInitial action', async () => {
  const store = mockStore({ articles: { start: 0 } });
  await store.dispatch(loadInitial('unseen'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: ARTICLES_INITIAL, source: 'unseen' },
    { type: ARTICLES_LOADED, articles: [] },
  ]);
});

it('dispatches the load action', async () => {
  const store = mockStore({ articles: { start: 0 } });
  await store.dispatch(load());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: ARTICLES_LOADED, articles: [] }]);
});

it('dispatches the deleteFeed action', async () => {
  const store = mockStore(mockState);
  await store.dispatch(deleteFeed('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([{ type: ARTICLES_INITIAL }, { type: ARTICLES_LOADED, articles: [] }]);
});

it('dispatches the markSeen action', async () => {
  const store = mockStore(mockState);
  await store.dispatch(markSeen('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: ARTICLES_MARK_SEEN, articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});

it('dispatches the markRead action', async () => {
  const store = mockStore(mockState);
  await store.dispatch(markRead('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: ARTICLES_TOGGLE_READ, articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});

it('dispatches the markImportant action', async () => {
  const store = mockStore(mockState);
  await store.dispatch(markImportant('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: ARTICLES_TOGGLE_IMPORTANT, articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});

it('dispatches the read action', async () => {
  const store = mockStore(mockState);
  await store.dispatch(read('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: ARTICLES_MARK_READ, articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});
