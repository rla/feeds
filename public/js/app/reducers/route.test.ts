import { ROUTE_VIEW } from '../actions/route';
import reducer, { RouteState } from './route';

const mockState: RouteState = {
    view: null,
    args: []
};

it('handles the route action', () => {
    const state = reducer(mockState, {
        type: ROUTE_VIEW,
        view: 'feed',
        args: ['e4161d28-1e43-11e9-ab14-d663bd873d93']
    });
    expect(state.view).toBe('feed');
    expect(state.args).toEqual(['e4161d28-1e43-11e9-ab14-d663bd873d93']);
});
