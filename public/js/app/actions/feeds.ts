import { FeedStatRow } from '../../../../src/lib/data';
import { Api } from '../api';
import { FeedsState } from '../store';
import { ThunkDispatch } from './thunk';

export const FEEDS_LOADED = 'FEEDS_LOADED';
export const FEEDS_FEED_DELETED = 'FEEDS_FEED_DELETED';
export const FEEDS_INITIAL = 'FEEDS_INITIAL';
export const FEEDS_FEED_MARKED_SEEN = 'FEEDS_FEED_MARKED_SEEN';
export const FEEDS_FEED_MARKED_READ = 'FEEDS_FEED_MARKED_READ';

export type FeedsLoaded = {
    type: typeof FEEDS_LOADED,
    feeds: FeedStatRow[]
};

export type FeedsFeedDeleted = {
    type: typeof FEEDS_FEED_DELETED,
    feedId: string
};

export type FeedsInitial = {
    type: typeof FEEDS_INITIAL
};

export type FeedsFeedMarkedSeen = {
    type: typeof FEEDS_FEED_MARKED_SEEN,
    feedId: string
};

export type FeedsFeedMarkedRead = {
    type: typeof FEEDS_FEED_MARKED_READ,
    feedId: string
};

export type FeedsAction =
    FeedsLoaded |
    FeedsFeedDeleted |
    FeedsInitial |
    FeedsFeedMarkedSeen |
    FeedsFeedMarkedRead;

/**
 * Loads feeds from the backend.
 */
export const loadInitial = () => {
    return async (dispatch: ThunkDispatch) => {
        await dispatch(initial());
        await dispatch(load());
    };
};

/**
 * Loads feeds from the backend. Can be called multiple times.
 */
export const load = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        const state = getState();
        const feeds = await api.feeds(state.feeds.start, api.BATCH);
        await dispatch(loaded(feeds));
    };
};

/**
 * Deletes the given feed.
 */
export const deleteFeed = (feedId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch(feedDeleted(feedId));
        await api.deleteFeed(feedId);
    };
};

/**
 * Marks whole feed to be seen.
 */
export const markSeen = (feedId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch(feedMarkedSeen(feedId));
        await api.seenFeed(feedId);
    };
};

/**
 * Marks whole feed to be read.
 */
export const markRead = (feedId: string) => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
        await dispatch(feedMarkedRead(feedId));
        await api.readFeed(feedId);
    };
};

const loaded = (feeds: FeedStatRow[]) => ({ type: FEEDS_LOADED, feeds });

const feedDeleted = (feedId: string) => ({ type: FEEDS_FEED_DELETED, feedId });

const feedMarkedSeen = (feedId: string) => ({ type: FEEDS_FEED_MARKED_SEEN, feedId });

const feedMarkedRead = (feedId: string) => ({ type: FEEDS_FEED_MARKED_READ, feedId });

const initial = () => ({ type: FEEDS_INITIAL });
