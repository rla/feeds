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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const react_dom_1 = __importDefault(__webpack_require__(2));
const app_1 = __importDefault(__webpack_require__(3));
react_dom_1.default.render(react_1.default.createElement(app_1.default, null), document.getElementById('root'));


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
const api = __importStar(__webpack_require__(4));
const router = __importStar(__webpack_require__(5));
const article_list_1 = __importDefault(__webpack_require__(6));
const invalid_list_1 = __importDefault(__webpack_require__(12));
const feed_list_1 = __importDefault(__webpack_require__(14));
const menu_1 = __importDefault(__webpack_require__(16));
const login_1 = __importDefault(__webpack_require__(17));
const search_1 = __importDefault(__webpack_require__(18));
const spinner_1 = __importDefault(__webpack_require__(19));
const urls_1 = __importDefault(__webpack_require__(20));
// The top-level app component.
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: window.loggedIn,
            display: 'unseen',
            args: {}
        };
        this.onLogout = this.onLogout.bind(this);
        this.onAuthenticated = this.onAuthenticated.bind(this);
    }
    // Logs out the application.
    async onLogout() {
        try {
            await api.logout();
            this.setState({ authenticated: false });
        }
        catch (err) {
            alert(`Failed to log out: ${err}.`);
        }
    }
    // Called when user is successfully authenticated.
    onAuthenticated() {
        this.setState({ authenticated: true });
    }
    // Helper to set the displayed page from the router.
    setDisplay(display, args) {
        this.setState({ display, args: args || {} });
    }
    // Sets up routes. This uses the basic hash router.
    componentDidMount() {
        router.route(/^important/, () => this.setDisplay('important'));
        router.route(/^all/, () => this.setDisplay('all'));
        router.route(/^unread/, () => this.setDisplay('unread'));
        router.route(/^unseen/, () => this.setDisplay('unseen'));
        router.route(/^feeds/, () => this.setDisplay('feeds'));
        router.route(/^invalid/, () => this.setDisplay('invalid'));
        router.route(/^feed\/([A-Za-z0-9\-]+)/, (uuid) => this.setDisplay('feed', { id: uuid }));
        router.route(/^search$/, () => this.setDisplay('search_form'));
        router.route(/^search\/(.+)/, (query) => this.setDisplay('search', { query }));
        router.route(/.*/, () => router.go('unseen'));
    }
    // Renders the component.
    render() {
        const display = this.state.display;
        const displayTypes = {
            article: ['all', 'important', 'unseen', 'feed', 'search'],
            invalid: ['invalid'],
            feeds: ['feeds'],
            search: ['search_form']
        };
        let displayType = 'unseen';
        const currentDisplayType = Object.keys(displayTypes).find((key) => {
            const types = displayTypes[key];
            return types ? types.indexOf(display) >= 0 : false;
        });
        if (currentDisplayType) {
            displayType = currentDisplayType;
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(spinner_1.default, null),
            react_1.default.createElement(menu_1.default, { onLogout: this.onLogout, authenticated: this.state.authenticated }),
            !this.state.authenticated && displayType !== 'search' &&
                react_1.default.createElement(login_1.default, { onAuthenticated: this.onAuthenticated }),
            displayType === 'feeds' && this.state.authenticated &&
                react_1.default.createElement(urls_1.default, null),
            displayType === 'article' &&
                react_1.default.createElement(article_list_1.default, { authenticated: this.state.authenticated, source: this.state.display, args: this.state.args }),
            displayType === 'invalid' &&
                react_1.default.createElement(invalid_list_1.default, { authenticated: this.state.authenticated }),
            displayType === 'feeds' &&
                react_1.default.createElement(feed_list_1.default, { authenticated: this.state.authenticated }),
            displayType === 'search' &&
                react_1.default.createElement(search_1.default, { query: this.state.args.query })));
    }
}
exports.default = App;


/***/ }),
/* 4 */
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
    return requestFetch(url, { method: 'DELETE', credentials: 'include' });
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
    return putJSON(`/article/${articleId}/read`);
};
/**
 * Marks the article as unread.
 */
exports.markUnread = async (articleId) => {
    return putJSON(`/article/${articleId}/unread`);
};
/**
 * Marks the article as important.
 */
exports.markImportant = async (articleId) => {
    return putJSON(`/article/${articleId}/important`);
};
/**
 * Marks the article as unimportant.
 */
exports.markUnimportant = async (articleId) => {
    return putJSON(`/article/${articleId}/unimportant`);
};
/**
 * Marks all given articles as seen.
 */
exports.markSeen = async (articleIds) => {
    return putJSON('/seen', articleIds);
};
/**
 * Marks all articles in the feed as seen.
 */
exports.seenFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/seen`);
};
/**
 * Marks all articles in the feed as read.
 */
exports.readFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/read`);
};
/**
 * Removes errors from the feed.
 */
exports.resolveFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/resolve`);
};
/**
 * Adds given feed URLs.
 */
exports.addUrls = async (urls) => {
    return postJSON('/urls', urls);
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
    return postJSON('/logout');
};
exports.BATCH = 30;


/***/ }),
/* 5 */
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
/* 6 */
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
const api = __importStar(__webpack_require__(4));
const scroll = __importStar(__webpack_require__(7));
const immut = __importStar(__webpack_require__(8));
const article_1 = __importDefault(__webpack_require__(9));
const MAX_ROW_ID = 9007199254740991;
// Helper to handle the article list display.
// Also handles infinite scroll.
class ArticleList extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            rowid: MAX_ROW_ID
        };
        this.deleteFeed = this.deleteFeed.bind(this);
        this.markRead = this.markRead.bind(this);
        this.markImportant = this.markImportant.bind(this);
        this.markSeen = this.markSeen.bind(this);
        this.read = this.read.bind(this);
        this.load = this.load.bind(this);
    }
    // Resets state upon props change.
    componentWillReceiveProps(props) {
        if (props.source !== this.props.source ||
            props.args !== this.props.args) {
            // Repopulate the view.
            this.setState({
                articles: [],
                rowid: MAX_ROW_ID
            }, () => this.load());
        }
    }
    // Deletes the given feed.
    async deleteFeed(articleId) {
        if (!this.props.authenticated) {
            return;
        }
        const article = this.state.articles.find((article) => article.uuid === articleId);
        if (article && confirm(`Delete the feed ${article.feed_title}?`)) {
            await api.deleteFeed(article.feed);
            // Repopulate the view.
            this.setState({
                articles: [],
                rowid: MAX_ROW_ID
            }, () => this.load());
        }
    }
    // Marks the given article as read/unread.
    async markRead(articleId) {
        if (!this.props.authenticated) {
            return;
        }
        this.setState((prevState) => {
            const index = prevState.articles.findIndex((article) => article.uuid === articleId);
            const saveRead = prevState.articles[index].is_read === 1 ? 0 : 1;
            // Launch API calls.
            if (saveRead === 1) {
                api.markRead(articleId);
            }
            else {
                api.markUnread(articleId);
            }
            return {
                articles: immut.modifyItem(prevState.articles, index, (article) => {
                    return Object.assign({}, article, { is_read: saveRead });
                })
            };
        });
    }
    // Marks the given article as important.
    markImportant(articleId) {
        if (!this.props.authenticated) {
            return;
        }
        this.setState((prevState) => {
            const index = prevState.articles.findIndex((article) => article.uuid === articleId);
            const saveImportant = prevState.articles[index].is_important === 1 ? 0 : 1;
            // Launch API calls.
            if (saveImportant === 1) {
                api.markImportant(articleId);
            }
            else {
                api.markUnimportant(articleId);
            }
            return {
                articles: immut.modifyItem(prevState.articles, index, (article) => {
                    return Object.assign({}, article, { is_important: saveImportant });
                })
            };
        });
    }
    // Marks the given article and those above it as seen.
    markSeen(articleId) {
        if (!this.props.authenticated) {
            return;
        }
        this.setState((prevState) => {
            const articles = prevState.articles;
            const index = articles.findIndex((article) => article.uuid === articleId);
            const uuids = [];
            const copy = []; // TODO use immutable.js
            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];
                if (i <= index) {
                    if (article.is_seen === 0) {
                        uuids.push(article.uuid);
                        copy.push(Object.assign({}, article, { is_seen: 1 }));
                    }
                    else {
                        copy.push(article);
                    }
                }
                else {
                    copy.push(article);
                }
            }
            api.markSeen(uuids);
            return { articles: copy };
        });
    }
    // Read the article. Marks it read.
    read(articleId) {
        if (!this.props.authenticated) {
            const article = this.state.articles.find((article) => article.uuid === articleId);
            if (article) {
                const tab = window.open(article.link, '_blank');
                if (tab) {
                    tab.focus();
                }
            }
            return;
        }
        this.setState((prevState) => {
            const index = prevState.articles.findIndex((article) => article.uuid === articleId);
            const article = prevState.articles[index];
            if (article) {
                const tab = window.open(article.link, '_blank');
                if (tab) {
                    tab.focus();
                }
            }
            api.markRead(articleId);
            return {
                articles: immut.modifyItem(prevState.articles, index, (article) => {
                    return Object.assign({}, article, { is_read: 1, is_seen: 1 });
                })
            };
        });
    }
    async load() {
        let source = this.props.source;
        if (source === 'feed') {
            source = `feed/${this.props.args.id}`;
        }
        else if (source === 'search') {
            const query = this.props.args.query || '';
            source = `search/${encodeURIComponent(query)}`;
        }
        const articles = await api.articles(source, this.state.rowid, api.BATCH);
        let rowid = this.state.rowid;
        for (const article of articles) {
            if (article.article_rowid < rowid) {
                rowid = article.article_rowid;
            }
        }
        this.setState((prevState) => {
            return {
                articles: prevState.articles.concat(articles),
                rowid
            };
        });
    }
    // Adds infinite scroll handler.
    componentDidMount() {
        this.load();
        scroll.addHandler(this.load);
    }
    // Removes the infinite scroll handler.
    componentWillUnmount() {
        scroll.removeHandler(this.load);
    }
    render() {
        return (react_1.default.createElement("div", null, this.state.articles.map((article) => {
            return react_1.default.createElement(article_1.default, { item: article, key: article.uuid, authenticated: this.props.authenticated, deleteFeed: this.deleteFeed, markImportant: this.markImportant, markRead: this.markRead, markSeen: this.markSeen, read: this.read });
        })));
    }
}
exports.default = ArticleList;


/***/ }),
/* 7 */
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Sets item using the callback. Returns
// new array.
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyItem = (array, index, cb) => {
    const item = array[index];
    if (item) {
        const copy = array.slice(0);
        copy[index] = cb(item);
        return copy;
    }
    else {
        return array;
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const button_1 = __importDefault(__webpack_require__(10));
exports.default = (props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    return (react_1.default.createElement("div", { className: 'well well-small' },
        react_1.default.createElement("strong", null, item.title),
        react_1.default.createElement("br", null),
        "Published ",
        item.date.toISOString().substring(0, 10),
        " in ",
        react_1.default.createElement("a", { href: `#feed/${item.feed}` }, item.feed_title),
        react_1.default.createElement("div", { className: 'buttons' },
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.deleteFeed(item.uuid) }, "Delete feed"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, inverse: !!item.is_read, onClick: () => props.markRead(item.uuid) }, "Mark read"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, danger: !!item.is_important, onClick: () => props.markImportant(item.uuid) }, "Important"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, inverse: !!item.is_seen, onClick: () => props.markSeen(item.uuid) }, "Seen"),
            react_1.default.createElement(button_1.default, { inverse: !!item.is_read, onClick: () => props.read(item.uuid) }, "Read"))));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const classlist_1 = __importDefault(__webpack_require__(11));
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
/* 11 */
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
/* 12 */
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
const api = __importStar(__webpack_require__(4));
const scroll = __importStar(__webpack_require__(7));
const invalid_1 = __importDefault(__webpack_require__(13));
/**
 * Helper to handle the invalid feed list display.
 */
class InvalidList extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0
        };
        this.deleteFeed = this.deleteFeed.bind(this);
        this.resolveFeed = this.resolveFeed.bind(this);
        this.load = this.load.bind(this);
    }
    // Reloads the view.
    refresh() {
        this.setState((prevState) => {
            return {
                items: [],
                start: 0
            };
        }, () => this.load());
    }
    // Deletes the given feed.
    async deleteFeed(feedId) {
        if (!this.props.authenticated) {
            return;
        }
        const feed = this.state.items.find((item) => item.uuid === feedId);
        if (feed) {
            if (confirm(`Delete the feed ${feed.title}?`)) {
                await api.deleteFeed(feedId);
                // Refresh the current view.
                this.refresh();
            }
        }
    }
    // Sets the feed non-invalid.
    resolveFeed(feedId) {
        if (!this.props.authenticated) {
            return;
        }
        // TODO use immutable.js
        this.setState((prevState) => {
            const index = prevState.items.findIndex((item) => item.uuid === feedId);
            api.resolveFeed(feedId);
            const copy = prevState.items.slice(0);
            copy.splice(index, 1);
            return { items: copy };
        });
    }
    // Loads data for this view. Re-triggered by the
    // infinite scroll.
    async load() {
        const invalid = await api.invalid(this.state.start, api.BATCH);
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(invalid),
                start: prevState.start + Math.min(api.BATCH, invalid.length)
            };
        });
    }
    // Adds infinite scroll handler.
    componentDidMount() {
        this.load();
        scroll.addHandler(this.load);
    }
    // Removes the infinite scroll handler.
    componentWillUnmount() {
        scroll.removeHandler(this.load);
    }
    render() {
        return (react_1.default.createElement("div", null, this.state.items.map((item) => {
            return react_1.default.createElement(invalid_1.default, { item: item, key: item.uuid, authenticated: this.props.authenticated, deleteFeed: this.deleteFeed, resolveFeed: this.resolveFeed });
        })));
    }
}
exports.default = InvalidList;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const button_1 = __importDefault(__webpack_require__(10));
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
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.deleteFeed(item.uuid) }, "Delete"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.resolveFeed(item.uuid) }, "Resolve"),
            react_1.default.createElement(button_1.default, { href: `#feed/${item.uuid}` }, "View"))));
};


/***/ }),
/* 14 */
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
const api = __importStar(__webpack_require__(4));
const scroll = __importStar(__webpack_require__(7));
const feed_1 = __importDefault(__webpack_require__(15));
/**
 * Helper to handle the feeds list display.
 */
class FeedList extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0
        };
        this.deleteFeed = this.deleteFeed.bind(this);
        this.allSeen = this.allSeen.bind(this);
        this.allRead = this.allRead.bind(this);
        this.load = this.load.bind(this);
    }
    // Reloads the view.
    refresh() {
        this.setState((prevState) => {
            return {
                items: [],
                start: 0
            };
        }, () => this.load());
    }
    // Deletes the given feed.
    async deleteFeed(feedId) {
        if (!this.props.authenticated) {
            return;
        }
        const feed = this.state.items.find((item) => item.uuid === feedId);
        if (feed) {
            if (confirm(`Delete the feed ${feed.title}?`)) {
                await api.deleteFeed(feedId);
                // Refresh the current view.
                this.refresh();
            }
        }
    }
    // Marks all feed articles as seen.
    async allSeen(feedId) {
        if (!this.props.authenticated) {
            return;
        }
        await api.seenFeed(feedId);
        // Refresh the current view.
        this.refresh();
    }
    // Marks all feed articles as read.
    async allRead(feedId) {
        if (!this.props.authenticated) {
            return;
        }
        await api.readFeed(feedId);
        // Refresh the current view.
        this.refresh();
    }
    // Loads feed items.
    async load() {
        const feeds = await api.feeds(this.state.start, api.BATCH);
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(feeds),
                start: prevState.start + Math.min(api.BATCH, feeds.length)
            };
        });
    }
    // Adds infinite scroll handler.
    componentDidMount() {
        this.load();
        scroll.addHandler(this.load);
    }
    // Removes the infinite scroll handler.
    componentWillUnmount() {
        scroll.removeHandler(this.load);
    }
    render() {
        return (react_1.default.createElement("div", null, this.state.items.map((item) => {
            return react_1.default.createElement(feed_1.default, { item: item, key: item.uuid, authenticated: this.props.authenticated, allRead: this.allRead, allSeen: this.allSeen, deleteFeed: this.deleteFeed });
        })));
    }
}
exports.default = FeedList;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const button_1 = __importDefault(__webpack_require__(10));
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
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.deleteFeed(item.uuid) }, "Delete"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.allSeen(item.uuid) }, "All seen"),
            react_1.default.createElement(button_1.default, { disabled: !authenticated, onClick: () => props.allRead(item.uuid) }, "All read"),
            react_1.default.createElement(button_1.default, { href: `#feed/${item.uuid}` }, "View"))));
};


/***/ }),
/* 16 */
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
        props.onLogout();
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
/* 17 */
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
const api = __importStar(__webpack_require__(4));
/**
 * Login form.
 */
class Login extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(e) {
        this.setState({ user: e.target.value });
    }
    handlePassChange(e) {
        this.setState({ pass: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.login();
    }
    async login() {
        if (await api.login(this.state.user, this.state.pass)) {
            this.props.onAuthenticated();
        }
    }
    render() {
        return (react_1.default.createElement("form", { className: 'form-inline', onSubmit: this.handleSubmit },
            react_1.default.createElement("input", { type: 'text', name: 'user', placeholder: 'user', className: 'input-small', value: this.state.user, onChange: this.handleUserChange }),
            react_1.default.createElement("input", { type: 'password', name: 'pass', placeholder: 'pass', className: 'input-small', value: this.state.pass, onChange: this.handlePassChange }),
            react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Login")));
    }
}
exports.default = Login;


/***/ }),
/* 18 */
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
const router = __importStar(__webpack_require__(5));
/**
 * Search form.
 */
class Search extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { query: props.query };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Handles the term input change.
    handleChange(e) {
        this.setState({ query: e.target.value });
    }
    // Handles the submission of the search form. Directs
    // the router to the search results page.
    handleSubmit(e) {
        e.preventDefault();
        router.go('search', encodeURIComponent(this.state.query));
    }
    render() {
        return (react_1.default.createElement("form", { className: 'form-inline', onSubmit: this.handleSubmit },
            react_1.default.createElement("input", { type: 'text', name: 'query', placeholder: 'search term', onChange: this.handleChange }),
            react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Search")));
    }
}
exports.default = Search;


/***/ }),
/* 19 */
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
const api = __importStar(__webpack_require__(4));
/**
 * Helper to show/hide the global AJAX spinner.
 */
class Spinner extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    componentDidMount() {
        api.addHandler((visible) => {
            this.setState({ visible });
        });
    }
    render() {
        return (react_1.default.createElement("div", null, this.state.visible && react_1.default.createElement("div", { className: 'spin' })));
    }
}
exports.default = Spinner;


/***/ }),
/* 20 */
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
const api = __importStar(__webpack_require__(4));
const router = __importStar(__webpack_require__(5));
/**
 * Form to add new feed URLs.
 */
class Urls extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { lines: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Handles the input change.
    handleChange(e) {
        this.setState({ lines: e.target.value });
    }
    // Handles the submission of the form.
    async handleSubmit(e) {
        e.preventDefault();
        const lines = this.state.lines.split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        await api.addUrls(lines);
        this.setState({ lines: '' });
        router.refresh();
    }
    render() {
        return (react_1.default.createElement("form", { onSubmit: this.handleSubmit },
            react_1.default.createElement("label", { htmlFor: 'urls' }, "Add list of feed URLs (one per line)"),
            react_1.default.createElement("textarea", { id: 'urls', onChange: this.handleChange, rows: 3, value: this.state.lines }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("button", { type: 'submit', className: 'btn' }, "Add")));
    }
}
exports.default = Urls;


/***/ })
/******/ ]);