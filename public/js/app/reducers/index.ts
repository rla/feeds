import { combineReducers } from 'redux';
import route from './route';
import invalid from './invalid';
import spinner from './spinner';
import auth from './auth';
import login from './login';
import feeds from './feeds';
import articles from './articles';
import search from './search';
import urls from './urls';

export default combineReducers({
    route,
    invalid,
    spinner,
    auth,
    login,
    feeds,
    articles,
    search,
    urls
});
