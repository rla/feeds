import {
    INVALID_FEED_RESOLVED,
    INVALID_LOADED,
    INVALID_INITIAL
} from '../actions/invalid';
import reducer, { InvalidFeedsState } from './invalid';
import { FeedRow } from '../../../../src/lib/data';

const mockItems: FeedRow[] = [
    {
        title: 'Test feed',
        uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
        error: null,
        url: 'http://example.com'
    }
];

const mockState: InvalidFeedsState = {
    items: mockItems,
    start: 0
};

it('handles the resolve action', () => {
    const state = reducer(mockState, {
        type: INVALID_FEED_RESOLVED,
        feedId: 'e4161d28-1e43-11e9-ab14-d663bd873d93'
    });
    expect(state.items.length).toBe(0);
});

it('handles the load action', () => {
    const state = reducer(undefined, {
        type: INVALID_LOADED, feeds: mockItems
    });
    expect(state.items.length).toBe(1);
    expect(state.start).toBe(1);
});

it('handles the initial action', () => {
    const state = reducer(mockState, {
        type: INVALID_INITIAL
    });
    expect(state.items.length).toBe(0);
    expect(state.start).toBe(0);
});
