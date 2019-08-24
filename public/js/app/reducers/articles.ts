import { ArticleData } from '../api';
import {
  ArticlesAction,
  ARTICLES_LOADED,
  ARTICLES_INITIAL,
  ARTICLES_MARK_READ,
  ARTICLES_TOGGLE_IMPORTANT,
  ARTICLES_TOGGLE_READ,
  ARTICLES_MARK_SEEN,
} from '../actions/articles';
import updateItem from './updateItem';

export type ArticleSource = 'all' | 'important' | 'unseen' | 'feed' | 'search';

export type ArticlesState = {
  source: ArticleSource;
  items: ArticleData[];
  rowid: number;
};

const MAX_ROW_ID = 9007199254740991;

const initialState: ArticlesState = {
  source: 'unseen',
  items: [],
  rowid: MAX_ROW_ID,
};

/**
 * Helper function to update single article.
 */
const updateArticle = (
  state: ArticlesState,
  articleId: string,
  fn: (article: ArticleData) => ArticleData
) => {
  const index = state.items.findIndex(article => article.uuid === articleId);
  if (index >= 0) {
    return { ...state, items: updateItem(state.items, index, fn) };
  } else {
    return state;
  }
};

export default (state = initialState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case ARTICLES_LOADED:
      const articles = action.articles;
      let rowid = state.rowid;
      // Finds smallest rowid.
      for (const article of articles) {
        if (article.article_rowid < rowid) {
          rowid = article.article_rowid;
        }
      }
      return {
        ...state,
        items: state.items.concat(action.articles),
        rowid,
      };
    case ARTICLES_INITIAL:
      return {
        items: [],
        rowid: MAX_ROW_ID,
        source: action.source,
      };
    case ARTICLES_TOGGLE_READ:
      return updateArticle(state, action.articleId, article => {
        return { ...article, is_read: article.is_read === 1 ? 0 : 1, is_seen: 1 };
      });
    case ARTICLES_MARK_READ:
      return updateArticle(state, action.articleId, article => {
        return { ...article, is_read: 1, is_seen: 1 };
      });
    case ARTICLES_MARK_SEEN:
      const index = state.items.findIndex(article => article.uuid === action.articleId);
      if (index >= 0) {
        const items = state.items.slice(0, index + 1).map(article => ({ ...article, is_seen: 1 }));
        return { ...state, items: items.concat(state.items.slice(index + 1)) };
      } else {
        return state;
      }
    case ARTICLES_TOGGLE_IMPORTANT:
      return updateArticle(state, action.articleId, article => {
        return { ...article, is_important: article.is_important === 1 ? 0 : 1 };
      });
    default:
      return state;
  }
};
