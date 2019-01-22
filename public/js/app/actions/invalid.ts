import { FeedRow } from '../../../../src/lib/data';
import { Api } from '../api';
import { FeedsState } from '../store';
import { ThunkDispatch } from './thunk';

export const INVALID_LOADED = 'INVALID_LOADED';
export const INVALID_FEED_RESOLVED = 'INVALID_FEED_RESOLVED';
export const INVALID_INITIAL = 'INVALID_INITIAL';

export type InvalidLoaded = {
    type: typeof INVALID_LOADED,
    feeds: FeedRow[]
};

export type InvalidFeedResolved = {
    type: typeof INVALID_FEED_RESOLVED,
    feedId: string
};

export type InvalidInitial = {
    type: typeof INVALID_INITIAL
};

export type InvalidAction =
    InvalidLoaded |
    InvalidFeedResolved |
    InvalidInitial;

/**
 * Loads invalid feeds from the backend. Can be called multiple times.
 */
export const loadInitial = () => {
    return async (dispatch: ThunkDispatch) => {
        await dispatch(initial());
        await dispatch(load());
    };
};

/**
 * Loads invalid feeds from the backend. Can be called multiple times.
 */
export const load = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        const state = getState();
        const feeds = await api.invalid(state.invalid.start, api.BATCH);
        await dispatch(loaded(feeds));
    };
};

/**
 * Deletes the given feed. Reloads the view.
 */
export const deleteFeed = (feedId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await api.deleteFeed(feedId);
        await dispatch(loadInitial());
    };
};

/**
 * Resolves the given feed.
 */
export const resolveFeed = (feedId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await api.resolveFeed(feedId);
        await dispatch(feedResolved(feedId));
    };
};

const feedResolved = (feedId: string) => ({ type: INVALID_FEED_RESOLVED, feedId });

const loaded = (feeds: FeedRow[]) => ({ type: INVALID_LOADED, feeds });

const initial = () => ({ type: INVALID_INITIAL });
