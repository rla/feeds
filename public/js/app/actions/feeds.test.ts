import {
  loadInitial,
  load,
  deleteFeed,
  markSeen,
  markRead,
  FEEDS_LOADED,
  FEEDS_INITIAL,
  FEEDS_FEED_DELETED,
  FEEDS_FEED_MARKED_SEEN,
  FEEDS_FEED_MARKED_READ,
} from './feeds';
import mockStore from '../testing/mock/store';

it('dispatches the loadInitial action', async () => {
  const store = mockStore({ feeds: { start: 0 } });
  await store.dispatch(loadInitial());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: FEEDS_INITIAL }, { type: FEEDS_LOADED, feeds: [] }]);
});

it('dispatches the load action', async () => {
  const store = mockStore({ feeds: { start: 0 } });
  await store.dispatch(load());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: FEEDS_LOADED, feeds: [] }]);
});

it('dispatches the deleteFeed action', async () => {
  const store = mockStore({});
  await store.dispatch(deleteFeed('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: FEEDS_FEED_DELETED, feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});

it('dispatches the markSeen action', async () => {
  const store = mockStore({});
  await store.dispatch(markSeen('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: FEEDS_FEED_MARKED_SEEN, feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});

it('dispatches the markRead action', async () => {
  const store = mockStore({});
  await store.dispatch(markRead('e4161d28-1e43-11e9-ab14-d663bd873d93'));
  const actions = store.getActions();
  expect(actions).toEqual([
    { type: FEEDS_FEED_MARKED_READ, feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93' },
  ]);
});
