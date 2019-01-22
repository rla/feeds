import { SPINNER_SHOW, SPINNER_HIDE, SpinnerAction } from '../actions/spinner';

export type SpinnerState = {
    show: boolean
};

const initialState = {
    show: false
};

export default (state = initialState, action: SpinnerAction): SpinnerState => {
    switch (action.type) {
        case SPINNER_SHOW:
            return Object.assign({}, state, { show: true });
        case SPINNER_HIDE:
            return Object.assign({}, state, { show: false });
        default:
            return state;
    }
};
