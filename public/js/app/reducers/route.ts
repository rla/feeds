import { RouteAction, ROUTE_VIEW } from '../actions/route';

export type View =
    'feeds' |
    'invalid' |
    'search' |
    'results' |
    'feed' |
    'unseen' |
    'important';

/**
 * Contains route data. Property view is for the logical
 * view name. Path is the full path.
 */
export type RouteState = {
    view: View | null,
    args?: string[]
};

const initialState: RouteState = {
    view: null,
    args: []
};

export default (state = initialState, action: RouteAction): RouteState => {
    switch (action.type) {
        case ROUTE_VIEW:
            return {
                ...state,
                view: action.view,
                args: action.args
            };
        default:
            return state;
    }
};
