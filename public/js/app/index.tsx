import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import store from './store';
import * as router from './router';
import * as scroll from './scroll';
import * as api from './api';
import { routeView, routeScroll } from './actions/route';
import { showSpinner, hideSpinner } from './actions/spinner';
import { ThunkDispatch } from './actions/thunk';
import { authSuccessful } from './actions/auth';

type AppWindow = Window & {
    loggedIn: boolean
};

const dispatchThunk = store.dispatch as ThunkDispatch;

// Set initial authentication status.
if ((window as AppWindow).loggedIn) {
    dispatchThunk(authSuccessful());
}

// Handles infinite scroll.
scroll.addHandler(() => dispatchThunk(routeScroll()));

// Handles AJAX spinner show/hide.
api.addHandler((show) => dispatchThunk(show ? showSpinner() : hideSpinner()));

// Route handlers.
router.route(/^important/, () => dispatchThunk(routeView('important')));
router.route(/^unseen/, () => dispatchThunk(routeView('unseen')));
router.route(/^invalid/, () => dispatchThunk(routeView('invalid')));
router.route(/^feeds/, () => dispatchThunk(routeView('feeds')));
router.route(/^search$/, () => dispatchThunk(routeView('search')));
router.route(/^feed\/([A-Za-z0-9\-]+)/, (uuid: string) => dispatchThunk(routeView('feed', [uuid])));
router.route(/^results\/(.+)/, (query: string) => dispatchThunk(routeView('results', [query])));
router.route(/.*/, () => router.go('unseen'));

ReactDOM.render(<Provider store={store}><AppContainer/></Provider>,
    document.getElementById('root'));
