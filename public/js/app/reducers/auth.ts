import {
    AUTH_SUCCESSFUL,
    AUTH_LOGGED_OUT,
    AuthAction
} from '../actions/auth';

export type AuthState = {
    authenticated: boolean
};

const initialState = {
    authenticated: false
};

export default (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_SUCCESSFUL:
            return {
                ...state,
                authenticated: true
            };
        case AUTH_LOGGED_OUT:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
};
