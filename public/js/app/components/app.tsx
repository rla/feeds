import React from 'react';
import * as api from '../api';
import * as router from '../router';
import ArticleList from './article_list';
import InvalidList from './invalid_list';
import FeedList from './feed_list';
import Menu from './menu';
import Login from './login';
import Search from './search';
import Spinner from './spinner';
import Urls from './urls';

type State = {
    authenticated: boolean,
    display: string,
    args: { [key: string]: string }
};

type AppWindow = Window & {
    loggedIn: boolean
};

type DisplayTypes = {
    [key: string]: string[]
};

// The top-level app component.

export default class App extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            authenticated: (window as AppWindow).loggedIn,
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
        } catch (err) {
            alert(`Failed to log out: ${err}.`);
        }
    }

    // Called when user is successfully authenticated.

    onAuthenticated() {
        this.setState({ authenticated: true });
    }

    // Helper to set the displayed page from the router.

    setDisplay(display: string, args?: {}) {
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
        router.route(/^feed\/([A-Za-z0-9\-]+)/, (uuid: string) => this.setDisplay('feed', { id: uuid }));
        router.route(/^search$/, () => this.setDisplay('search_form'));
        router.route(/^search\/(.+)/, (query: string) => this.setDisplay('search', { query }));
        router.route(/.*/, () => router.go('unseen'));
    }

    // Renders the component.

    render() {
        const display = this.state.display;
        const displayTypes: DisplayTypes = {
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
        return (
            <div>
                <Spinner/>
                <Menu onLogout={this.onLogout} authenticated={this.state.authenticated}/>
                {!this.state.authenticated && displayType !== 'search' &&
                    <Login onAuthenticated={this.onAuthenticated}/>}
                {displayType === 'feeds' && this.state.authenticated &&
                    <Urls/>}
                {displayType === 'article' &&
                    <ArticleList authenticated={this.state.authenticated}
                        source={this.state.display} args={this.state.args}/>}
                {displayType === 'invalid' &&
                    <InvalidList authenticated={this.state.authenticated}/>}
                {displayType === 'feeds' &&
                    <FeedList authenticated={this.state.authenticated}/>}
                {displayType === 'search' &&
                    <Search query={this.state.args.query}/>}
            </div>
        );
    }
}
