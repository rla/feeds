import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { InvalidFeedsState } from './reducers/invalid';
import { RouteState } from './reducers/route';
import { SpinnerState } from './reducers/spinner';
import { AuthState } from './reducers/auth';
import { LoginState } from './reducers/login';
import { FeedsFeedsState } from './reducers/feeds';
import { ArticlesState } from './reducers/articles';
import { SearchState } from './reducers/search';
import { UrlsState } from './reducers/urls';

export type FeedsState = {
    invalid: InvalidFeedsState,
    route: RouteState,
    spinner: SpinnerState,
    auth: AuthState,
    login: LoginState,
    feeds: FeedsFeedsState,
    articles: ArticlesState,
    search: SearchState,
    urls: UrlsState
};

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * State store for the Feeds application.
 */
export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
