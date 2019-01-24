import * as invalid from './invalid';
import * as feeds from './feeds';
import * as articles from './articles';
import * as search from './search';
import { ThunkDispatch } from './thunk';
import { FeedsState } from '../store';
import { View } from '../reducers/route';

export const ROUTE_VIEW = 'ROUTE_VIEW';

export type RouteAction = {
    type: typeof ROUTE_VIEW,
    view: View,
    args?: string[]
};

/**
 * Routes to the given view.
 */
export const routeView = (view: View, args?: string[]) => {
    return async (dispatch: ThunkDispatch) => {
        dispatch({ type: ROUTE_VIEW, view, args });
        if (view === 'invalid') {
            await dispatch(invalid.loadInitial());
        } else if (view === 'feeds') {
            await dispatch(feeds.loadInitial());
        } else if (view === 'results') {
            if (args && args[0]) {
                await dispatch(search.setQuery(args[0]));
            }
            await dispatch(articles.loadInitial('search'));
        } else if (view === 'feed') {
            await dispatch(articles.loadInitial('feed'));
        } else if (view === 'unseen') {
            await dispatch(articles.loadInitial('unseen'));
        } else if (view === 'important') {
            await dispatch(articles.loadInitial('important'));
        }
    };
};

/**
 * Requests individual view to load more data.
 * All views load more items through infinite scroll.
 */
export const routeScroll = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        const state = getState();
        if (state.route.view === 'invalid') {
            await dispatch(invalid.load());
        } else if (state.route.view === 'feeds') {
            await dispatch(feeds.load());
        } else if (state.route.view === 'results') {
            await dispatch(articles.load());
        } else if (state.route.view === 'feed') {
            await dispatch(articles.load());
        } else if (state.route.view === 'unseen') {
            await dispatch(articles.load());
        } else if (state.route.view === 'important') {
            await dispatch(articles.load());
        }
    };
};
