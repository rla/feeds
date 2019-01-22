import { FeedStatRow } from '../../../../src/lib/data';
import {
    FeedsAction,
    FEEDS_LOADED,
    FEEDS_FEED_DELETED,
    FEEDS_INITIAL
} from '../actions/feeds';

export type FeedsFeedsState = {
    items: FeedStatRow[],
    start: number
};

const initialState: FeedsFeedsState = {
    items: [],
    start: 0
};

export default (state = initialState, action: FeedsAction): FeedsFeedsState => {
    switch (action.type) {
        case FEEDS_FEED_DELETED:
            return Object.assign({}, state, {
                items: state.items.filter((feed) => feed.uuid !== action.feedId)
            });
        case FEEDS_LOADED:
            return Object.assign({}, state, {
                items: state.items.concat(action.feeds),
                start: state.start + action.feeds.length
            });
        case FEEDS_INITIAL:
            return initialState;
        // TODO finish
        default:
            return state;
    }
};
