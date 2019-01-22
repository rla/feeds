import { FeedRow } from '../../../../src/lib/data';
import {
    InvalidAction,
    INVALID_LOADED,
    INVALID_FEED_RESOLVED,
    INVALID_INITIAL
} from '../actions/invalid';

export type InvalidFeedsState = {
    items: FeedRow[],
    start: number
};

const initialState: InvalidFeedsState = {
    items: [],
    start: 0
};

export default (state = initialState, action: InvalidAction): InvalidFeedsState => {
    switch (action.type) {
        case INVALID_FEED_RESOLVED:
            return {
                ...state,
                items: state.items.filter((feed) => feed.uuid !== action.feedId),
            };
        case INVALID_LOADED:
            return {
                ...state,
                items: state.items.concat(action.feeds),
                start: state.start + action.feeds.length,
            };
        case INVALID_INITIAL:
            return initialState;
        default:
            return state;
    }
};
