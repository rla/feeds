import {
  ARTICLES_LOADED,
  ARTICLES_INITIAL,
  ARTICLES_TOGGLE_READ,
  ARTICLES_TOGGLE_IMPORTANT,
  ARTICLES_MARK_READ,
} from '../actions/articles';
import reducer, { ArticlesState } from './articles';
import { ArticleData } from '../api';

const mockItems: ArticleData[] = [
  {
    title: 'Test feed',
    link: 'http://example.com',
    uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    article_rowid: 1,
    date: new Date(),
    feed: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    feed_title: 'Test feed',
    fetch_time: 0,
    id: '123',
    is_important: 0,
    is_read: 0,
    is_seen: 0,
    published: 0,
  },
];

const mockState: ArticlesState = {
  items: mockItems,
  rowid: 0,
  source: 'search',
};

it('handles the initial action', () => {
  const state = reducer(undefined, {
    type: ARTICLES_INITIAL,
    source: 'search',
  });
  expect(state.items.length).toBe(0);
  expect(state.source).toBe('search');
  expect(state.rowid).toBeGreaterThan(0);
});

it('handles the loaded action', () => {
  const state = reducer(undefined, {
    type: ARTICLES_LOADED,
    articles: mockItems,
  });
  expect(state.items.length).toBe(1);
});

it('handles the read toggle action', () => {
  let state = reducer(mockState, {
    type: ARTICLES_TOGGLE_READ,
    articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
  });
  expect(state.items[0].is_read).toBe(1);
  state = reducer(state, {
    type: ARTICLES_TOGGLE_READ,
    articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
  });
  expect(state.items[0].is_read).toBe(0);
});

it('handles the mark read action', () => {
  const state = reducer(mockState, {
    type: ARTICLES_MARK_READ,
    articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
  });
  expect(state.items[0].is_read).toBe(1);
});

it('handles the important toggle action', () => {
  let state = reducer(mockState, {
    type: ARTICLES_TOGGLE_IMPORTANT,
    articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
  });
  expect(state.items[0].is_important).toBe(1);
  state = reducer(state, {
    type: ARTICLES_TOGGLE_IMPORTANT,
    articleId: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
  });
  expect(state.items[0].is_important).toBe(0);
});
