/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const react_dom_1 = __importDefault(__webpack_require__(2));
const react_redux_1 = __webpack_require__(3);
const AppContainer_1 = __importDefault(__webpack_require__(4));
const store_1 = __importDefault(__webpack_require__(34));
const router = __importStar(__webpack_require__(49));
const scroll = __importStar(__webpack_require__(50));
const api = __importStar(__webpack_require__(48));
const route_1 = __webpack_require__(27);
const spinner_1 = __webpack_require__(41);
const auth_1 = __webpack_require__(6);
const dispatchThunk = store_1.default.dispatch;
// Set initial authentication status.
if (window.loggedIn) {
    dispatchThunk(auth_1.authSuccessful());
}
// Handles infinite scroll.
scroll.addHandler(() => dispatchThunk(route_1.routeScroll()));
// Handles AJAX spinner show/hide.
api.addHandler((show) => dispatchThunk(show ? spinner_1.showSpinner() : spinner_1.hideSpinner()));
// Route handlers.
router.route(/^important/, () => dispatchThunk(route_1.routeView('important')));
router.route(/^unseen/, () => dispatchThunk(route_1.routeView('unseen')));
router.route(/^invalid/, () => dispatchThunk(route_1.routeView('invalid')));
router.route(/^feeds/, () => dispatchThunk(route_1.routeView('feeds')));
router.route(/^search/, () => dispatchThunk(route_1.routeView('search')));
router.route(/^feed\/([A-Za-z0-9\-]+)/, (uuid) => dispatchThunk(route_1.routeView('feed', [uuid])));
/*
router.route(/^search$/, () => this.setDisplay('search_form'));
router.route(/^search\/(.+)/, (query: string) => this.setDisplay('search', { query }));*/
router.route(/.*/, () => router.go('unseen'));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(AppContainer_1.default, null)), document.getElementById('root'));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const route_1 = __webpack_require__(5);
const auth_1 = __webpack_require__(6);
const App_1 = __importDefault(__webpack_require__(7));
const mapStateToProps = (state) => ({
    display: route_1.viewToDisplay(state.route.view),
    spinner: state.spinner.show,
    authenticated: state.auth.authenticated
});
const mapDispatchToProps = () => ({ logout: auth_1.logout });
/**
 * Fetch - based container component for the list of invalid feeds.
 */
const AppContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App_1.default);
exports.default = AppContainer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const viewToDisplayMap = {
    feeds: 'feeds',
    invalid: 'invalid',
    search: 'search',
    results: 'articles',
    feed: 'articles',
    unseen: 'articles',
    important: 'articles'
};
/**
 * Converts view name to display name. View names are used in routing
 * but display names are used for selecting actual view implementations.
 */
exports.viewToDisplay = (view) => {
    if (view === null) {
        return null;
    }
    else {
        const display = viewToDisplayMap[view];
        return display || null;
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
exports.AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';
exports.login = () => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const result = await api.login(state.login.user, state.login.pass);
        if (result) {
            await dispatch(exports.authSuccessful());
        }
    };
};
exports.logout = () => {
    return async (dispatch, getState, api) => {
        await api.logout();
        await dispatch(authLoggedOut());
    };
};
exports.authSuccessful = () => ({ type: exports.AUTH_SUCCESSFUL });
const authLoggedOut = () => ({ type: exports.AUTH_LOGGED_OUT });


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const InvalidListContainer_1 = __importDefault(__webpack_require__(8));
const LoginContainer_1 = __importDefault(__webpack_require__(14));
const FeedListContainer_1 = __importDefault(__webpack_require__(17));
const ArticlesContainer_1 = __importDefault(__webpack_require__(21));
const SearchContainer_1 = __importDefault(__webpack_require__(25));
const UrlsContainer_1 = __importDefault(__webpack_require__(29));
const Spinner_1 = __importDefault(__webpack_require__(32));
const Menu_1 = __importDefault(__webpack_require__(33));
const content = (props) => {
    switch (props.display) {
        case 'invalid':
            return react_1.default.createElement(InvalidListContainer_1.default, null);
        case 'feeds':
            return (react_1.default.createElement("div", null,
                props.authenticated && react_1.default.createElement(UrlsContainer_1.default, null),
                react_1.default.createElement(FeedListContainer_1.default, null)));
        case 'articles':
            return react_1.default.createElement(ArticlesContainer_1.default, null);
        case 'search':
            return react_1.default.createElement(SearchContainer_1.default, null);
        default:
            return null;
    }
};
exports.default = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Spinner_1.default, { show: props.spinner }),
        react_1.default.createElement(Menu_1.default, { logout: props.logout, authenticated: props.authenticated }),
        (!props.authenticated && props.display !== 'search') && react_1.default.createElement(LoginContainer_1.default, null),
        content(props)));
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const invalid_1 = __webpack_require__(9);
const InvalidList_1 = __importDefault(__webpack_require__(10));
const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    items: state.invalid.items
});
const mapDispatchToProps = (dispatch) => ({
    deleteFeed: (feedId) => dispatch(invalid_1.deleteFeed(feedId)),
    resolveFeed: (feedId) => dispatch(invalid_1.resolveFeed(feedId))
});
/**
 * Fetch - based container component for the list of invalid feeds.
 */
const InvalidListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InvalidList_1.default);
exports.default = InvalidListContainer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_LOADED = 'INVALID_LOADED';
exports.INVALID_FEED_RESOLVED = 'INVALID_FEED_RESOLVED';
exports.INVALID_INITIAL = 'INVALID_INITIAL';
/**
 * Loads invalid feeds from the backend. Can be called multiple times.
 */
exports.loadInitial = () => {
    return async (dispatch) => {
        await dispatch(initial());
        await dispatch(exports.load());
    };
};
/**
 * Loads invalid feeds from the backend. Can be called multiple times.
 */
exports.load = () => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const feeds = await api.invalid(state.invalid.start, api.BATCH);
        await dispatch(loaded(feeds));
    };
};
/**
 * Deletes the given feed. Reloads the view.
 */
exports.deleteFeed = (feedId) => {
    return async (dispatch, getState, api) => {
        await api.deleteFeed(feedId);
        await dispatch(exports.loadInitial());
    };
};
/**
 * Resolves the given feed.
 */
exports.resolveFeed = (feedId) => {
    return async (dispatch, getState, api) => {
        await api.resolveFeed(feedId);
        await dispatch(feedResolved(feedId));
    };
};
const feedResolved = (feedId) => ({ type: exports.INVALID_FEED_RESOLVED, feedId });
const loaded = (feeds) => ({ type: exports.INVALID_LOADED, feeds });
const initial = () => ({ type: exports.INVALID_INITIAL });


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Invalid_1 = __importDefault(__webpack_require__(11));
/**
 * Helper to handle the invalid feed list display.
 */
exports.default = (props) => {
    return (react_1.default.createElement("div", null, props.items.map((item) => {
        return react_1.default.createElement(Invalid_1.default, { item: item, key: item.uuid, authenticated: props.authenticated, deleteFeed: props.deleteFeed, resolveFeed: props.resolveFeed });
    })));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Button_1 = __importDefault(__webpack_require__(12));
/**
 * Displays one invalid feed list item.
 */
exports.default = (props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    return (react_1.default.createElement("div", { className: 'well well-small' },
        react_1.default.createElement("strong", null, item.title),
        react_1.default.createElement("br", null),
        "Error: ",
        item.error,
        react_1.default.createElement("div", { className: 'buttons' },
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: () => props.deleteFeed(item.uuid) }, "Delete"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: () => props.resolveFeed(item.uuid) }, "Resolve"),
            react_1.default.createElement(Button_1.default, { href: `#feed/${item.uuid}` }, "View"))));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const classlist_1 = __importDefault(__webpack_require__(13));
exports.default = (props) => {
    // Helper to set the button CSS classes.
    const classes = {
        'btn': true,
        'btn-small': true,
        'btn-danger': !!props.danger,
        'btn-inverse': !!props.inverse,
        'disabled': !!props.disabled
    };
    const href = props.href || '#';
    // Helper that automatically calls preventDefault
    // on the DOM event when the callback is set.
    const preventDefault = (cb) => {
        return (e) => {
            if (typeof cb === 'function') {
                e.preventDefault();
                cb();
            }
        };
    };
    return (react_1.default.createElement("a", { href: href, onClick: preventDefault(props.onClick), className: classlist_1.default(classes) }, props.children));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper to render a classlist.
 */
exports.default = (classes) => {
    return Object.keys(classes).filter((clazz) => classes[clazz]).join(' ');
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const login_1 = __webpack_require__(15);
const Login_1 = __importDefault(__webpack_require__(16));
const mapStateToProps = (state) => ({
    user: state.login.user,
    pass: state.login.pass,
});
const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(login_1.setUser(user)),
    setPass: (pass) => dispatch(login_1.setPass(pass)),
    submit: () => dispatch(login_1.submit())
});
/**
 * Fetch - based container component for the list of invalid feeds.
 */
const LoginContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login_1.default);
exports.default = LoginContainer;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __webpack_require__(6);
exports.LOGIN_SET_USERNAME = 'LOGIN_SET_USERNAME';
exports.LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD';
exports.submit = () => {
    return async (dispatch) => {
        await dispatch(auth_1.login());
    };
};
exports.setUser = (user) => ({ type: exports.LOGIN_SET_USERNAME, user });
exports.setPass = (pass) => ({ type: exports.LOGIN_SET_PASSWORD, pass });


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
/**
 * Login form.
 */
exports.default = (props) => {
    const setUser = (e) => {
        props.setUser(e.target.value);
    };
    const setPass = (e) => {
        props.setPass(e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        props.submit();
    };
    return (react_1.default.createElement("form", { className: 'form-inline', onSubmit: submit },
        react_1.default.createElement("input", { type: 'text', name: 'user', placeholder: 'user', className: 'input-small', value: props.user, onChange: setUser }),
        react_1.default.createElement("input", { type: 'password', name: 'pass', placeholder: 'pass', className: 'input-small', value: props.pass, onChange: setPass }),
        react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Login")));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const feeds_1 = __webpack_require__(18);
const FeedList_1 = __importDefault(__webpack_require__(19));
const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    items: state.feeds.items
});
const mapDispatchToProps = (dispatch) => ({
    deleteFeed: (feedId) => dispatch(feeds_1.deleteFeed(feedId)),
    allSeen: (feedId) => dispatch(feeds_1.markSeen(feedId)),
    allRead: (feedId) => dispatch(feeds_1.markRead(feedId))
});
/**
 * Fetch - based container component for the list of invalid feeds.
 */
const FeedListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FeedList_1.default);
exports.default = FeedListContainer;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FEEDS_LOADED = 'FEEDS_LOADED';
exports.FEEDS_FEED_DELETED = 'FEEDS_FEED_DELETED';
exports.FEEDS_INITIAL = 'FEEDS_INITIAL';
exports.FEEDS_FEED_MARKED_SEEN = 'FEEDS_FEED_MARKED_SEEN';
exports.FEEDS_FEED_MARKED_READ = 'FEEDS_FEED_MARKED_READ';
/**
 * Loads feeds from the backend.
 */
exports.loadInitial = () => {
    return async (dispatch) => {
        await dispatch(initial());
        await dispatch(exports.load());
    };
};
/**
 * Loads feeds from the backend. Can be called multiple times.
 */
exports.load = () => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const feeds = await api.feeds(state.feeds.start, api.BATCH);
        await dispatch(loaded(feeds));
    };
};
/**
 * Deletes the given feed.
 */
exports.deleteFeed = (feedId) => {
    return async (dispatch, getState, api) => {
        await api.deleteFeed(feedId);
        await dispatch(feedDeleted(feedId));
    };
};
/**
 * Marks whole feed to be seen.
 */
exports.markSeen = (feedId) => {
    return async (dispatch, getState, api) => {
        await api.seenFeed(feedId);
        await dispatch(feedMarkedSeen(feedId));
    };
};
/**
 * Marks whole feed to be read.
 */
exports.markRead = (feedId) => {
    return async (dispatch, getState, api) => {
        await api.readFeed(feedId);
        await dispatch(feedMarkedRead(feedId));
    };
};
const loaded = (feeds) => ({ type: exports.FEEDS_LOADED, feeds });
const feedDeleted = (feedId) => ({ type: exports.FEEDS_FEED_DELETED, feedId });
const feedMarkedSeen = (feedId) => ({ type: exports.FEEDS_FEED_MARKED_SEEN, feedId });
const feedMarkedRead = (feedId) => ({ type: exports.FEEDS_FEED_MARKED_READ, feedId });
const initial = () => ({ type: exports.FEEDS_INITIAL });


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Feed_1 = __importDefault(__webpack_require__(20));
exports.default = (props) => {
    return (react_1.default.createElement("div", null, props.items.map((item) => {
        return react_1.default.createElement(Feed_1.default, { item: item, key: item.uuid, authenticated: props.authenticated, allRead: props.allRead, allSeen: props.allSeen, deleteFeed: props.deleteFeed });
    })));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Button_1 = __importDefault(__webpack_require__(12));
/**
 * Displays one feed list item.
 */
exports.default = (props) => {
    const item = props.item;
    const authenticated = props.authenticated;
    return (react_1.default.createElement("div", { className: 'well well-small' },
        react_1.default.createElement("strong", null, item.title),
        react_1.default.createElement("br", null),
        item.unread,
        " unread,",
        item.unseen,
        " unseen,",
        item.important,
        " important",
        react_1.default.createElement("div", { className: 'buttons' },
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: () => props.deleteFeed(item.uuid) }, "Delete"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: () => props.allSeen(item.uuid) }, "All seen"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: () => props.allRead(item.uuid) }, "All read"),
            react_1.default.createElement(Button_1.default, { href: `#feed/${item.uuid}` }, "View"))));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const articles_1 = __webpack_require__(22);
const Articles_1 = __importDefault(__webpack_require__(23));
const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    items: state.articles.items
});
const mapDispatchToProps = (dispatch) => ({
    deleteFeed: (articleId) => dispatch(articles_1.deleteFeed(articleId)),
    markRead: (articleId) => dispatch(articles_1.markRead(articleId)),
    markImportant: (articleId) => dispatch(articles_1.markImportant(articleId)),
    markSeen: (articleId) => dispatch(articles_1.markSeen(articleId)),
    read: (articleId) => dispatch(articles_1.read(articleId))
});
/**
 * Container for the list of articles.
 */
const ArticlesContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Articles_1.default);
exports.default = ArticlesContainer;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ARTICLES_LOADED = 'ARTICLES_LOADED';
exports.ARTICLES_INITIAL = 'ARTICLES_INITIAL';
exports.ARTICLES_TOGGLE_READ = 'ARTICLES_TOGGLE_READ';
exports.ARTICLES_MARK_READ = 'ARTICLES_MARK_READ';
exports.ARTICLES_TOGGLE_IMPORTANT = 'ARTICLES_TOGGLE_IMPORTANT';
exports.ARTICLES_MARK_SEEN = 'ARTICLES_MARK_SEEN';
/**
 * Loads articles from the backend.
 */
exports.loadInitial = (source) => {
    return async (dispatch) => {
        await dispatch(initial(source));
        await dispatch(exports.load());
    };
};
/**
 * Loads articles from the backend. Can be called multiple times.
 */
exports.load = () => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const source = state.articles.source;
        if (source === 'search') {
            if (state.search.query !== '') {
                const fullSource = `search/${encodeURIComponent(state.search.query)}`;
                const articles = await api.articles(fullSource, state.articles.rowid, api.BATCH);
                await dispatch(loaded(articles));
            }
        }
        else if (source === 'feed') {
            const args = state.route.args;
            if (args) {
                const feedId = args[0];
                if (feedId) {
                    const fullSource = `feed/${feedId}`;
                    const articles = await api.articles(fullSource, state.articles.rowid, api.BATCH);
                    await dispatch(loaded(articles));
                }
            }
        }
        else {
            const articles = await api.articles(source, state.articles.rowid, api.BATCH);
            await dispatch(loaded(articles));
        }
    };
};
/**
 * Delete the feed associated with the given article.
 * Reloads the given view.
 */
exports.deleteFeed = (articleId) => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const article = state.articles.items.find((article) => article.uuid === articleId);
        if (article) {
            await api.deleteFeed(article.feed);
            await dispatch(exports.loadInitial(state.articles.source));
        }
    };
};
/**
 * Toggles the read status of the article.
 */
exports.markRead = (articleId) => {
    return async (dispatch, getState, api) => {
        await dispatch({ type: exports.ARTICLES_TOGGLE_READ, articleId });
        const article = getState().articles.items.find((article) => article.uuid === articleId);
        if (article) {
            if (article.is_read) {
                await api.markRead(articleId);
            }
            else {
                await api.markUnread(articleId);
            }
        }
    };
};
/**
 * Toggles the important status of the article.
 */
exports.markImportant = (articleId) => {
    return async (dispatch, getState, api) => {
        await dispatch({ type: exports.ARTICLES_TOGGLE_IMPORTANT, articleId });
        const article = getState().articles.items.find((article) => article.uuid === articleId);
        if (article) {
            if (article.is_important) {
                await api.markImportant(articleId);
            }
            else {
                await api.markUnimportant(articleId);
            }
        }
    };
};
/**
 * Marks the article and other articles before
 * it (on the view list) as seen.
 */
exports.markSeen = (articleId) => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const index = state.articles.items.findIndex((article) => article.uuid === articleId);
        if (index >= 0) {
            const markSet = state.articles.items.slice(0, index + 1)
                .filter((article) => article.is_seen === 0)
                .map((article) => article.uuid);
            await dispatch({ type: exports.ARTICLES_MARK_SEEN, articleId });
            await api.markSeen(markSet);
        }
    };
};
/**
 * Opens the article in new tab. Marks the read status.
 */
exports.read = (articleId) => {
    return async (dispatch, getState, api) => {
        await dispatch({ type: exports.ARTICLES_MARK_READ, articleId });
        const state = getState();
        if (state.auth.authenticated) {
            await api.markRead(articleId);
        }
    };
};
const initial = (source) => ({ type: exports.ARTICLES_INITIAL, source });
const loaded = (articles) => ({ type: exports.ARTICLES_LOADED, articles });


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Article_1 = __importDefault(__webpack_require__(24));
/**
 * Displays the list of articles.
 */
exports.default = (props) => {
    return (react_1.default.createElement("div", null, props.items.map((article) => {
        return react_1.default.createElement(Article_1.default, { item: article, key: article.uuid, authenticated: props.authenticated, deleteFeed: props.deleteFeed, markImportant: props.markImportant, markRead: props.markRead, markSeen: props.markSeen, read: props.read });
    })));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const Button_1 = __importDefault(__webpack_require__(12));
/**
 * Displays single article in a list view of the articles.
 */
exports.default = (props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    const dateString = item.date.toISOString().substring(0, 10);
    const deleteFeed = () => {
        if (props.authenticated) {
            if (confirm(`Delete the feed ${props.item.feed_title}?`)) {
                props.deleteFeed(props.item.uuid);
            }
        }
    };
    const read = () => {
        props.read(props.item.uuid);
        const tab = window.open(props.item.link, '_blank');
        if (tab) {
            tab.focus();
        }
    };
    return (react_1.default.createElement("div", { className: 'well well-small' },
        react_1.default.createElement("strong", null, item.title),
        react_1.default.createElement("br", null),
        "Published ",
        dateString,
        " in ",
        react_1.default.createElement("a", { href: `#feed/${item.feed}` }, item.feed_title),
        react_1.default.createElement("div", { className: 'buttons' },
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, onClick: deleteFeed }, "Delete feed"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, inverse: !!item.is_read, onClick: () => props.markRead(item.uuid) }, "Mark read"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, danger: !!item.is_important, onClick: () => props.markImportant(item.uuid) }, "Important"),
            react_1.default.createElement(Button_1.default, { disabled: !authenticated, inverse: !!item.is_seen, onClick: () => props.markSeen(item.uuid) }, "Seen"),
            react_1.default.createElement(Button_1.default, { inverse: !!item.is_read, onClick: read }, "Read"))));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const search_1 = __webpack_require__(26);
const Search_1 = __importDefault(__webpack_require__(28));
const mapStateToProps = (state) => ({
    query: state.search.query
});
const mapDispatchToProps = (dispatch) => ({
    setQuery: (query) => dispatch(search_1.setQuery(query)),
    submit: () => dispatch(search_1.submit())
});
/**
 * Container for the search form.
 */
const SearchContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Search_1.default);
exports.default = SearchContainer;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __webpack_require__(27);
exports.SEARCH_SET_QUERY = 'SEARCH_SET_QUERY';
/**
 * Submits the search form. Dispatches action to
 * show the search result view.
 */
exports.submit = () => {
    return async (dispatch) => {
        await dispatch(route_1.routeView('results'));
    };
};
exports.setQuery = (query) => ({ type: exports.SEARCH_SET_QUERY, query });


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid = __importStar(__webpack_require__(9));
const feeds = __importStar(__webpack_require__(18));
const articles = __importStar(__webpack_require__(22));
exports.ROUTE_VIEW = 'ROUTE_VIEW';
/**
 * Routes to the given view.
 */
exports.routeView = (view, args) => {
    return async (dispatch) => {
        dispatch({ type: exports.ROUTE_VIEW, view, args });
        if (view === 'invalid') {
            await dispatch(invalid.loadInitial());
        }
        else if (view === 'feeds') {
            await dispatch(feeds.loadInitial());
        }
        else if (view === 'results') {
            await dispatch(articles.loadInitial('search'));
        }
        else if (view === 'feed') {
            await dispatch(articles.loadInitial('feed'));
        }
        else if (view === 'unseen') {
            await dispatch(articles.loadInitial('unseen'));
        }
        else if (view === 'important') {
            await dispatch(articles.loadInitial('important'));
        }
    };
};
/**
 * Requests individual view to load more data.
 * All views load more items through infinite scroll.
 */
exports.routeScroll = () => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.route.view === 'invalid') {
            await dispatch(invalid.load());
        }
        else if (state.route.view === 'feeds') {
            await dispatch(feeds.load());
        }
        else if (state.route.view === 'results') {
            await dispatch(articles.load());
        }
        else if (state.route.view === 'feed') {
            await dispatch(articles.load());
        }
        else if (state.route.view === 'unseen') {
            await dispatch(articles.load());
        }
        else if (state.route.view === 'important') {
            await dispatch(articles.load());
        }
    };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
/**
 * Search form.
 */
exports.default = (props) => {
    const changeQuery = (e) => {
        props.setQuery(e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        props.submit();
    };
    return (react_1.default.createElement("form", { className: 'form-inline', onSubmit: submit },
        react_1.default.createElement("input", { type: 'text', name: 'query', placeholder: 'search term', onChange: changeQuery }),
        react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Search")));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = __webpack_require__(3);
const urls_1 = __webpack_require__(30);
const Urls_1 = __importDefault(__webpack_require__(31));
const mapStateToProps = (state) => ({
    text: state.urls.text
});
const mapDispatchToProps = (dispatch) => ({
    setText: (text) => dispatch(urls_1.setText(text)),
    submit: () => dispatch(urls_1.submit())
});
/**
 * Container for the urls form.
 */
const UrlsContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Urls_1.default);
exports.default = UrlsContainer;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.URLS_SET_TEXT = 'URLS_SET_TEXT';
/**
 * Submits the urls form.
 */
exports.submit = () => {
    return async (dispatch, getState, api) => {
        const state = getState();
        const text = state.urls.text;
        const urls = text.split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        await dispatch({ type: exports.URLS_SET_TEXT, text: '' });
        await api.addUrls(urls);
    };
};
/**
 * Sets the urls form textarea content.
 */
exports.setText = (text) => ({ type: exports.URLS_SET_TEXT, text });


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
/**
 * Form to add new feed URLs.
 */
exports.default = (props) => {
    const changeText = (e) => {
        props.setText(e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        props.submit();
    };
    return (react_1.default.createElement("form", { onSubmit: submit },
        react_1.default.createElement("label", { htmlFor: 'urls' }, "Add list of feed URLs (one per line)"),
        react_1.default.createElement("textarea", { id: 'urls', onChange: changeText, rows: 3, value: props.text }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Add")));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
/**
 * Helper to show/hide the global AJAX spinner.
 */
exports.default = (props) => {
    return (react_1.default.createElement("div", null, props.show && react_1.default.createElement("div", { className: 'spin' })));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
exports.default = (props) => {
    const logout = (e) => {
        e.preventDefault();
        props.logout();
    };
    return (react_1.default.createElement("ul", { className: 'nav nav-pills' },
        react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#feeds' }, "Feeds")),
        react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#unseen' }, "Unseen")),
        react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#important' }, "Important")),
        react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#search' }, "Search")),
        react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#invalid' }, "Invalid")),
        props.authenticated && react_1.default.createElement("li", null,
            react_1.default.createElement("a", { href: '#', onClick: logout }, "Logout"))));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = __webpack_require__(35);
const redux_thunk_1 = __importDefault(__webpack_require__(36));
const reducers_1 = __importDefault(__webpack_require__(37));
const api_1 = __webpack_require__(48);
// tslint:disable-next-line:no-any
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
/**
 * State store for the Feeds application.
 * The API interface is passed as a separate
 * argument for thunk-based actions.
 */
exports.default = redux_1.createStore(reducers_1.default, composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default.withExtraArgument(api_1.api))));


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = ReduxThunk;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = __webpack_require__(35);
const route_1 = __importDefault(__webpack_require__(38));
const invalid_1 = __importDefault(__webpack_require__(39));
const spinner_1 = __importDefault(__webpack_require__(40));
const auth_1 = __importDefault(__webpack_require__(42));
const login_1 = __importDefault(__webpack_require__(43));
const feeds_1 = __importDefault(__webpack_require__(44));
const articles_1 = __importDefault(__webpack_require__(45));
const search_1 = __importDefault(__webpack_require__(46));
const urls_1 = __importDefault(__webpack_require__(47));
exports.default = redux_1.combineReducers({
    route: route_1.default,
    invalid: invalid_1.default,
    spinner: spinner_1.default,
    auth: auth_1.default,
    login: login_1.default,
    feeds: feeds_1.default,
    articles: articles_1.default,
    search: search_1.default,
    urls: urls_1.default
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __webpack_require__(27);
const initialState = {
    view: null,
    args: []
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case route_1.ROUTE_VIEW:
            return Object.assign({}, state, { view: action.view, args: action.args });
        default:
            return state;
    }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const invalid_1 = __webpack_require__(9);
const initialState = {
    items: [],
    start: 0
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case invalid_1.INVALID_FEED_RESOLVED:
            return Object.assign({}, state, { items: state.items.filter((feed) => feed.uuid !== action.feedId) });
        case invalid_1.INVALID_LOADED:
            return Object.assign({}, state, { items: state.items.concat(action.feeds), start: state.start + action.feeds.length });
        case invalid_1.INVALID_INITIAL:
            return initialState;
        default:
            return state;
    }
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const spinner_1 = __webpack_require__(41);
const initialState = {
    show: false
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case spinner_1.SPINNER_SHOW:
            return Object.assign({}, state, { show: true });
        case spinner_1.SPINNER_HIDE:
            return Object.assign({}, state, { show: false });
        default:
            return state;
    }
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SPINNER_SHOW = 'SPINNER_SHOW';
exports.SPINNER_HIDE = 'SPINNER_HIDE';
exports.showSpinner = () => ({ type: exports.SPINNER_SHOW });
exports.hideSpinner = () => ({ type: exports.SPINNER_HIDE });


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __webpack_require__(6);
const initialState = {
    authenticated: false
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case auth_1.AUTH_SUCCESSFUL:
            return Object.assign({}, state, { authenticated: true });
        case auth_1.AUTH_LOGGED_OUT:
            return Object.assign({}, state, { authenticated: false });
        default:
            return state;
    }
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __webpack_require__(15);
const initialState = {
    user: '',
    pass: ''
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case login_1.LOGIN_SET_USERNAME:
            return Object.assign({}, state, { user: action.user });
        case login_1.LOGIN_SET_PASSWORD:
            return Object.assign({}, state, { pass: action.pass });
        default:
            return state;
    }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const feeds_1 = __webpack_require__(18);
const initialState = {
    items: [],
    start: 0
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case feeds_1.FEEDS_FEED_DELETED:
            return Object.assign({}, state, { items: state.items.filter((feed) => feed.uuid !== action.feedId) });
        case feeds_1.FEEDS_LOADED:
            return Object.assign({}, state, { items: state.items.concat(action.feeds), start: state.start + action.feeds.length });
        case feeds_1.FEEDS_INITIAL:
            return initialState;
        // TODO finish
        default:
            return state;
    }
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = __webpack_require__(22);
const MAX_ROW_ID = 9007199254740991;
const initialState = {
    source: 'unseen',
    items: [],
    rowid: MAX_ROW_ID
};
/**
 * Helper function to update single item in array.
 */
const updateItem = (array, index, fn) => {
    const item = array[index];
    const copy = array.slice(0);
    copy[index] = fn(item);
    return copy;
};
/**
 * Helper function to update single article.
 */
const updateArticle = (state, articleId, fn) => {
    const index = state.items.findIndex((article) => article.uuid === articleId);
    if (index >= 0) {
        return Object.assign({}, state, { items: updateItem(state.items, index, fn) });
    }
    else {
        return state;
    }
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case articles_1.ARTICLES_LOADED:
            const articles = action.articles;
            let rowid = state.rowid;
            // Finds smallest rowid.
            for (const article of articles) {
                if (article.article_rowid < rowid) {
                    rowid = article.article_rowid;
                }
            }
            return Object.assign({}, state, { items: state.items.concat(action.articles), rowid });
        case articles_1.ARTICLES_INITIAL:
            return {
                items: [],
                rowid: MAX_ROW_ID,
                source: action.source
            };
        case articles_1.ARTICLES_TOGGLE_READ:
            return updateArticle(state, action.articleId, (article) => {
                return Object.assign({}, article, { is_read: article.is_read === 1 ? 0 : 1 });
            });
        case articles_1.ARTICLES_MARK_READ:
            return updateArticle(state, action.articleId, (article) => {
                return Object.assign({}, article, { is_read: 1, is_seen: 1 });
            });
        case articles_1.ARTICLES_MARK_SEEN:
            const index = state.items.findIndex((article) => article.uuid === action.articleId);
            if (index >= 0) {
                const items = state.items.slice(0, index + 1)
                    .map((article) => (Object.assign({}, article, { is_seen: 1 })));
                return Object.assign({}, state, { items: items.concat(state.items.slice(index + 1)) });
            }
            else {
                return state;
            }
        case articles_1.ARTICLES_TOGGLE_IMPORTANT:
            return updateArticle(state, action.articleId, (article) => {
                return Object.assign({}, article, { is_important: article.is_important === 1 ? 0 : 1 });
            });
        default:
            return state;
    }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = __webpack_require__(26);
const initialState = {
    query: ''
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case search_1.SEARCH_SET_QUERY:
            return Object.assign({}, state, { query: action.query });
        default:
            return state;
    }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const urls_1 = __webpack_require__(30);
const initialState = {
    text: ''
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case urls_1.URLS_SET_TEXT:
            return Object.assign({}, state, { text: action.text });
        default:
            return state;
    }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handlers = [];
let concurrentRequests = 0;
exports.addHandler = (cb) => {
    handlers.push(cb);
};
const callHandlers = (show) => {
    for (const handler of handlers) {
        handler(show);
    }
};
const startRequest = () => {
    concurrentRequests += 1;
    if (concurrentRequests === 1) {
        callHandlers(true);
    }
};
const endRequest = () => {
    concurrentRequests -= 1;
    if (concurrentRequests === 0) {
        callHandlers(false);
    }
};
// Very simple error handling that is enough
// for this application. Rethrows errors.
const handleError = (err) => {
    alert(`API call failed. ${err}`);
    throw err;
};
// Checks the API response. Throws error
// when the call was not successful.
const checkResponse = (json) => {
    if (json.error) {
        throw new Error(`API response error: ${json.data}.`);
    }
};
// Small wrapper around the fetch API to
// support AJAX spinner and simple error
// handling and reporting.
const requestFetch = async (url, options) => {
    try {
        startRequest();
        const response = await fetch(url, options);
        const json = await response.json();
        checkResponse(json);
        return json.data;
    }
    catch (err) {
        handleError(err);
        return {};
    }
    finally {
        endRequest();
    }
};
/**
 * Helper to create fetch API options
 * to post a JSON body with the given data.
 */
const jsonBodyOptions = (data) => {
    return {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
};
/**
 * Helper to run a GET request to retrieve data in JSON format.
 */
const getJSON = async (url) => {
    return requestFetch(url);
};
/**
 * Helper to post data in JSON format.
 */
const postJSON = async (url, data) => {
    return requestFetch(url, Object.assign({
        method: 'POST',
        credentials: 'include'
    }, jsonBodyOptions(data)));
};
/**
 * Helper to PUT data in JSON format.
 */
const putJSON = async (url, data) => {
    return requestFetch(url, Object.assign({
        method: 'PUT',
        credentials: 'include'
    }, jsonBodyOptions(data)));
};
/**
 * Helper to run a delete request.
 */
const deleteRequest = async (url) => {
    await requestFetch(url, { method: 'DELETE', credentials: 'include' });
};
/**
 * List of articles from the given source.
 */
exports.articles = async (source, rowid, batch) => {
    const articles = (await getJSON(`/${source}/${rowid}/${batch}`));
    return articles.map((article) => {
        const data = Object.assign({}, article, { date: new Date(article.published * 1000) });
        return data;
    });
};
/**
 * List of invalid feeds.
 */
exports.invalid = async (start, batch) => {
    return getJSON(`/invalid/${start}/${batch}`);
};
/**
 * List of all feeds.
 */
exports.feeds = async (start, batch) => {
    return getJSON(`/feeds/${start}/${batch}`);
};
/**
 * Deletes the given feed.
 */
exports.deleteFeed = async (feedId) => {
    return deleteRequest(`/feed/${feedId}`);
};
/**
 * Marks the article as read.
 */
exports.markRead = async (articleId) => {
    await putJSON(`/article/${articleId}/read`);
};
/**
 * Marks the article as unread.
 */
exports.markUnread = async (articleId) => {
    await putJSON(`/article/${articleId}/unread`);
};
/**
 * Marks the article as important.
 */
exports.markImportant = async (articleId) => {
    await putJSON(`/article/${articleId}/important`);
};
/**
 * Marks the article as unimportant.
 */
exports.markUnimportant = async (articleId) => {
    await putJSON(`/article/${articleId}/unimportant`);
};
/**
 * Marks all given articles as seen.
 */
exports.markSeen = async (articleIds) => {
    await putJSON('/seen', articleIds);
};
/**
 * Marks all articles in the feed as seen.
 */
exports.seenFeed = async (feedId) => {
    await putJSON(`/feed/${feedId}/seen`);
};
/**
 * Marks all articles in the feed as read.
 */
exports.readFeed = async (feedId) => {
    await putJSON(`/feed/${feedId}/read`);
};
/**
 * Removes errors from the feed.
 */
exports.resolveFeed = async (feedId) => {
    await putJSON(`/feed/${feedId}/resolve`);
};
/**
 * Adds given feed URLs.
 */
exports.addUrls = async (urls) => {
    await postJSON('/urls', urls);
};
/**
 * Starts an user session.
 */
exports.login = async (user, pass) => {
    const data = { user, pass };
    return (await postJSON('/login', data)).ok;
};
/**
 * Ends the user session.
 */
exports.logout = async () => {
    await postJSON('/logout');
};
// TODO: refactor out.
exports.BATCH = 30;
exports.api = {
    articles: exports.articles,
    invalid: exports.invalid,
    feeds: exports.feeds,
    deleteFeed: exports.deleteFeed,
    markRead: exports.markRead,
    markUnread: exports.markUnread,
    markImportant: exports.markImportant,
    markUnimportant: exports.markUnimportant,
    markSeen: exports.markSeen,
    seenFeed: exports.seenFeed,
    readFeed: exports.readFeed,
    resolveFeed: exports.resolveFeed,
    addUrls: exports.addUrls,
    login: exports.login,
    logout: exports.logout,
    BATCH: exports.BATCH
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const routes = [];
// Sets up a route.
exports.route = (regexp, cb) => {
    routes.push({ regexp, cb });
};
// Programmatically go a page.
// Supports extra arguments.
exports.go = (page, ...extra) => {
    window.location.hash = `#${page}${(extra.length > 0 ? '/' + extra.join('/') : '')}`;
};
// Re-dispatches the current route.
exports.refresh = () => {
    activate();
};
// Looks for matching routes. Picks first.
const activate = () => {
    const hash = window.location.hash.substring(1);
    for (const route of routes) {
        const match = hash.match(route.regexp);
        if (match) {
            route.cb.apply(null, match.slice(1, match.length));
            break;
        }
    }
};
// Sets up hash change and initial callbacks.
window.addEventListener('load', activate, false);
window.addEventListener('hashchange', activate, false);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Infinite scroll.
// Not cross-browser.
// Tested in FF 16, Chrome 2x?, Android 4.x.
Object.defineProperty(exports, "__esModule", { value: true });
const handlers = [];
exports.addHandler = (cb) => {
    handlers.push(cb);
};
exports.removeHandler = (cb) => {
    const index = handlers.indexOf(cb);
    if (index >= 0) {
        handlers.splice(index, 1);
    }
};
const callHandlers = () => {
    for (const cb of handlers) {
        cb();
    }
};
let throttle = false;
let lastOffset = 0; // used for detecting direction.
document.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const win = window.innerHeight;
    const toBotton = offset > lastOffset;
    lastOffset = offset;
    const atBottom = offset > (total - win - 100);
    if (toBotton && atBottom && !throttle) {
        throttle = true;
        callHandlers();
        setTimeout(() => {
            throttle = false;
        }, 3000);
    }
}, false);


/***/ })
/******/ ]);