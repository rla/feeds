import {
  all,
  feed,
  important,
  markFeedRead,
  markFeedSeen,
  markImportant,
  markRead,
  markSeen,
  removeFeed,
  save,
  search,
  unread,
  unseen,
} from './article';
import db from '../../testing/mock/db';
import { FeedArticle } from '../data';

it('should execute the all query', async () => {
  const results = await all(db(['item'], jest.fn()), 0, 30);
  expect(results).toEqual(['item']);
});

it('should execute the feed query', async () => {
  const results = await feed(
    db(['item'], jest.fn()),
    'e4161d28-1e43-11e9-ab14-d663bd873d93',
    0,
    30
  );
  expect(results).toEqual(['item']);
});

it('should execute the important query', async () => {
  const results = await important(db(['item'], jest.fn()), 0, 30);
  expect(results).toEqual(['item']);
});

it('should execute the markFeedsRead query', async () => {
  const fn = jest.fn();
  await markFeedRead(db([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
  expect(fn).toBeCalled();
});

it('should execute the markFeedSeen query', async () => {
  const fn = jest.fn();
  await markFeedSeen(db([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
  expect(fn).toBeCalled();
});

it('should execute the markImportant query', async () => {
  const fn = jest.fn();
  await markImportant(db([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', true);
  expect(fn).toBeCalled();
});

it('should execute the markRead query', async () => {
  const fn = jest.fn();
  await markRead(db([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93', true);
  expect(fn).toBeCalled();
});

it('should execute the markSeen query', async () => {
  const fn = jest.fn();
  await markSeen(db([], fn), ['e4161d28-1e43-11e9-ab14-d663bd873d93']);
  expect(fn).toBeCalled();
});

it('should execute the removeFeed query', async () => {
  const fn = jest.fn();
  await removeFeed(db([], fn), 'e4161d28-1e43-11e9-ab14-d663bd873d93');
  expect(fn).toBeCalled();
});

it('should execute the save query', async () => {
  const fn = jest.fn();
  const article: FeedArticle = {
    date: new Date(),
    feedUuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    id: 'test',
    link: 'http://example.com',
    title: 'Test Article',
  };
  await save(db([], fn), article);
  expect(fn).toBeCalled();
});

it('should execute the search query', async () => {
  const results = await search(db(['item'], jest.fn()), ['test'], 0, 20);
  expect(results).toEqual(['item']);
});

it('should execute the unread query', async () => {
  const results = await unread(db(['item'], jest.fn()), 0, 30);
  expect(results).toEqual(['item']);
});

it('should execute the unseen query', async () => {
  const results = await unseen(db(['item'], jest.fn()), 0, 30);
  expect(results).toEqual(['item']);
});
