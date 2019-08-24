import {
  AUTH_SUCCESSFUL,
  AUTH_LOGGED_OUT,
  AuthAction,
  AUTH_ALLOW_ANONYMOUS_READONLY,
} from '../actions/auth';

export type AuthState = {
  authenticated: boolean;
  allowAnonymousReadonly: boolean;
};

const initialState = {
  authenticated: false,
  allowAnonymousReadonly: false,
};

export default (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_SUCCESSFUL:
      return {
        ...state,
        authenticated: true,
      };
    case AUTH_LOGGED_OUT:
      return {
        ...state,
        authenticated: false,
      };
    case AUTH_ALLOW_ANONYMOUS_READONLY:
      return {
        ...state,
        allowAnonymousReadonly: true,
      };
    default:
      return state;
  }
};
