import {
    LOGIN_SET_USERNAME,
    LOGIN_SET_PASSWORD,
    LoginAction
} from '../actions/login';

export type LoginState = {
    user: string,
    pass: string
};

const initialState = {
    user: '',
    pass: ''
};

export default (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LOGIN_SET_USERNAME:
            return Object.assign({}, state, { user: action.user });
        case LOGIN_SET_PASSWORD:
            return Object.assign({}, state, { pass: action.pass });
        default:
            return state;
    }
};
