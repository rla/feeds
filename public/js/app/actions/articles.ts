import { ArticleSource } from '../reducers/articles';
import { FeedsState } from '../store';
import { ThunkDispatch } from './thunk';
import { Api, ArticleData } from '../api';

export const ARTICLES_LOADED = 'ARTICLES_LOADED';
export const ARTICLES_INITIAL = 'ARTICLES_INITIAL';
export const ARTICLES_TOGGLE_READ = 'ARTICLES_TOGGLE_READ';
export const ARTICLES_MARK_READ = 'ARTICLES_MARK_READ';
export const ARTICLES_TOGGLE_IMPORTANT = 'ARTICLES_TOGGLE_IMPORTANT';
export const ARTICLES_MARK_SEEN = 'ARTICLES_MARK_SEEN';

export type ArticlesLoaded = {
    type: typeof ARTICLES_LOADED,
    articles: ArticleData[]
};

export type ArticlesInitial = {
    type: typeof ARTICLES_INITIAL,
    source: ArticleSource
};

export type ArticlesMarkRead = {
    type: typeof ARTICLES_MARK_READ,
    articleId: string
};

export type ArticlesToggleRead = {
    type: typeof ARTICLES_TOGGLE_READ,
    articleId: string
};

export type ArticlesToggleImportant = {
    type: typeof ARTICLES_TOGGLE_IMPORTANT,
    articleId: string
};

export type ArticlesMarkSeen = {
    type: typeof ARTICLES_MARK_SEEN,
    articleId: string
};

export type ArticlesAction =
    ArticlesLoaded |
    ArticlesInitial |
    ArticlesMarkRead |
    ArticlesToggleRead |
    ArticlesToggleImportant |
    ArticlesMarkSeen;

/**
 * Loads articles from the backend.
 */
export const loadInitial = (source: ArticleSource) => {
    return async (dispatch: ThunkDispatch) => {
        await dispatch(initial(source));
        await dispatch(load());
    };
};

/**
 * Loads articles from the backend. Can be called multiple times.
 */
export const load = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        const state = getState();
        const source = state.articles.source;
        if (source === 'search') {
            if (state.search.query !== '') {
                const fullSource = `search/${encodeURIComponent(state.search.query)}`;
                const articles = await api.articles(fullSource, state.articles.rowid, api.BATCH);
                await dispatch(loaded(articles));
            }
        } else if (source === 'feed') {
            const args = state.route.args;
            if (args) {
                const feedId = args[0];
                if (feedId) {
                    const fullSource = `feed/${feedId}`;
                    const articles = await api.articles(fullSource, state.articles.rowid, api.BATCH);
                    await dispatch(loaded(articles));
                }
            }
        } else {
            const articles = await api.articles(source, state.articles.rowid, api.BATCH);
            await dispatch(loaded(articles));
        }
    };
};

/**
 * Delete the feed associated with the given article.
 * Reloads the given view.
 */
export const deleteFeed = (articleId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        const state = getState();
        const article = state.articles.items.find((article) => article.uuid === articleId);
        if (article) {
            await api.deleteFeed(article.feed);
            await dispatch(loadInitial(state.articles.source));
        }
    };
};

/**
 * Toggles the read status of the article.
 */
export const markRead = (articleId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch({ type: ARTICLES_TOGGLE_READ, articleId });
        const article = getState().articles.items.find((article) => article.uuid === articleId);
        if (article) {
            if (article.is_read) {
                await api.markRead(articleId);
            } else {
                await api.markUnread(articleId);
            }
        }
    };
};

/**
 * Toggles the important status of the article.
 */
export const markImportant = (articleId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch({ type: ARTICLES_TOGGLE_IMPORTANT, articleId });
        const article = getState().articles.items.find((article) => article.uuid === articleId);
        if (article) {
            if (article.is_important) {
                await api.markImportant(articleId);
            } else {
                await api.markUnimportant(articleId);
            }
        }
    };
};

/**
 * Marks the article and other articles before
 * it (on the view list) as seen.
 */
export const markSeen = (articleId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        const state = getState();
        const index = state.articles.items.findIndex((article) => article.uuid === articleId);
        if (index >= 0) {
            const markSet = state.articles.items.slice(0, index + 1)
                .filter((article) => article.is_seen === 0)
                .map((article) => article.uuid);
            await dispatch({ type: ARTICLES_MARK_SEEN, articleId });
            await api.markSeen(markSet);
        }
    };
};

/**
 * Opens the article in new tab. Marks the read status.
 */
export const read = (articleId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch({ type: ARTICLES_MARK_READ, articleId });
        const state = getState();
        if (state.auth.authenticated) {
            await api.markRead(articleId);
        }
    };
};

const initial = (source: ArticleSource) => ({ type: ARTICLES_INITIAL, source });

const loaded = (articles: ArticleData[]) => ({ type: ARTICLES_LOADED, articles });
