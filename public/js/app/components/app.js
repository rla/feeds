const api = require('../api');
const router = require('../router');
const ArticleList = require('./article_list');
const InvalidList = require('./invalid_list');
const FeedList = require('./feed_list');
const Menu = require('./menu');
const Login = require('./login');
const Search = require('./search');
const Spinner = require('./spinner');
const Urls = require('./urls');

// The top-level app component.

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            authenticated: false,
            display: null,
            args: {}
        };
        this.onLogout = this.onLogout.bind(this);
        this.onAuthenticated = this.onAuthenticated.bind(this);
    }

    // Logs out the application.
    
    onLogout() {
        this.setState({ authenticated: false });
    }

    // Called when user is successfully authenticated.

    onAuthenticated() {
        this.setState({ authenticated: true });
    }

    // Helper to set the displayed page from the router.

    setDisplay(display, args) {
        this.setState({ display: display, args: args || {} });
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
        const displayType = Object.keys(displayTypes).find((key) => {
            return displayTypes[key].indexOf(display) >= 0;
        });        
        return (
            <div>
                <Spinner/>
                <Menu menu={this.state.menu} onLogout={this.onLogout} authenticated={this.state.authenticated}/>
                {!this.state.authenticated && displayType !== 'search' &&
                    <Login onAuthenticated={this.onAuthenticated}/>}
                {displayType === 'feeds' && this.state.authenticated &&
                    <Urls/>}
                {displayType === 'article' &&
                    <ArticleList authenticated={this.state.authenticated} source={this.state.display} args={this.state.args}/>}
                {displayType === 'invalid' &&
                    <InvalidList authenticated={this.state.authenticated} args={this.state.args}/>}
                {displayType === 'feeds' &&
                    <FeedList authenticated={this.state.authenticated} args={this.state.args}/>}
                {displayType === 'search' &&
                    <Search args={this.state.args}/>}
            </div>
        );
    }
};
