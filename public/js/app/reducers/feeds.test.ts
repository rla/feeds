import {
    FEEDS_FEED_DELETED,
    FEEDS_LOADED,
    FEEDS_INITIAL
} from '../actions/feeds';
import reducer, { FeedsFeedsState } from './feeds';
import { FeedStatRow } from '../../../../src/lib/data';

const mockItems: FeedStatRow[] = [
    {
        title: 'Test feed',
        uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
        error: null,
        important: 0,
        unread: 0,
        unseen: 0,
        url: 'http://example.com'
    }
];

const mockState: FeedsFeedsState = {
    items: mockItems,
    start: 0
};

it('handles the delete action', () => {
    const state = reducer(mockState, {
        type: FEEDS_FEED_DELETED,
        feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93'
    });
    expect(state.items.length).toBe(0);
});

it('handles the delete action', () => {
    const state = reducer(undefined, {
        type: FEEDS_LOADED, feeds: mockItems
    });
    expect(state.items.length).toBe(1);
    expect(state.start).toBe(1);
});

it('handles the initial action', () => {
    const state = reducer(mockState, {
        type: FEEDS_INITIAL
    });
    expect(state.items.length).toBe(0);
    expect(state.start).toBe(0);
});

// TODO finish
