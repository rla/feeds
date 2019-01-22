import * as invalid from './invalid';
import * as feeds from './feeds';
import * as articles from './articles';
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
    return (dispatch: ThunkDispatch) => {
        dispatch({ type: ROUTE_VIEW, view, args });
        if (view === 'invalid') {
            dispatch(invalid.loadInitial());
        } else if (view === 'feeds') {
            dispatch(feeds.loadInitial());
        } else if (view === 'results') {
            dispatch(articles.loadInitial('search'));
        } else if (view === 'feed') {
            dispatch(articles.loadInitial('feed'));
        } else if (view === 'unseen') {
            dispatch(articles.loadInitial('unseen'));
        } else if (view === 'important') {
            dispatch(articles.loadInitial('important'));
        }
    };
};

/**
 * Refreshes the current view.
 */
export const routeRefresh = () => {
    return (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        const state = getState();
        const view = state.route.view;
        const args = state.route.args;
        if (view !== null) {
            dispatch(routeView(view, args));
        }
    };
};

/**
 * Requests individual view to load more data.
 * All views load more items through infinite scroll.
 */
export const routeScroll = () => {
    return (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        const state = getState();
        if (state.route.view === 'invalid') {
            dispatch(invalid.load());
        } else if (state.route.view === 'feeds') {
            dispatch(feeds.load());
        } else if (state.route.view === 'results') {
            dispatch(articles.load());
        } else if (state.route.view === 'feed') {
            dispatch(articles.load());
        } else if (state.route.view === 'unseen') {
            dispatch(articles.load());
        } else if (state.route.view === 'important') {
            dispatch(articles.load());
        }
    };
};
