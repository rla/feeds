import { FeedStatRow } from '../../../../src/lib/data';
import {
  FeedsAction,
  FEEDS_LOADED,
  FEEDS_FEED_DELETED,
  FEEDS_INITIAL,
  FEEDS_FEED_MARKED_SEEN,
  FEEDS_FEED_MARKED_READ,
} from '../actions/feeds';
import updateItem from './updateItem';

export type FeedsFeedsState = {
  items: FeedStatRow[];
  start: number;
};

const initialState: FeedsFeedsState = {
  items: [],
  start: 0,
};

/**
 * Helper function to update single feed.
 */
const updateFeed = (
  state: FeedsFeedsState,
  feedId: string,
  fn: (feed: FeedStatRow) => FeedStatRow
) => {
  const index = state.items.findIndex(feed => feed.uuid === feedId);
  if (index >= 0) {
    return { ...state, items: updateItem(state.items, index, fn) };
  } else {
    return state;
  }
};

export default (state = initialState, action: FeedsAction): FeedsFeedsState => {
  switch (action.type) {
    case FEEDS_FEED_MARKED_SEEN: {
      return updateFeed(state, action.feedId, (feed: FeedStatRow) => {
        return { ...feed, unseen: 0 };
      });
    }
    case FEEDS_FEED_MARKED_READ: {
      return updateFeed(state, action.feedId, (feed: FeedStatRow) => {
        return { ...feed, unread: 0 };
      });
    }
    case FEEDS_FEED_DELETED:
      return {
        ...state,
        items: state.items.filter(feed => feed.uuid !== action.feedId),
      };
    case FEEDS_LOADED:
      return {
        ...state,
        items: state.items.concat(action.feeds),
        start: state.start + action.feeds.length,
      };
    case FEEDS_INITIAL:
      return initialState;
    default:
      return state;
  }
};
