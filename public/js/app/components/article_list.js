const api = require('../api');
const scroll = require('../scroll');
const immut = require('../immut');
const Article = require('./article');

const MAX_ROW_ID = 9007199254740991;

// Helper to handle the article list display.
// Also handles infinite scroll.

module.exports = class ArticleList extends React.Component {

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
        this.handlers = {
            deleteFeed: this.deleteFeed,
            markRead: this.markRead,
            markImportant: this.markImportant,
            markSeen: this.markSeen,
            read: this.read
        };
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
        const article = this.state.articles.find(
            (article) => article.uuid === articleId);
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
            const index = prevState.articles.findIndex(
                (article) => article.uuid === articleId);
            const saveRead = prevState.articles[index].is_read === 1 ? 0 : 1;
            // Launch API calls.
            if (saveRead === 1) {
                api.markRead(articleId);
            } else {
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
            const index = prevState.articles.findIndex(
                (article) => article.uuid === articleId);
            const saveImportant = prevState.articles[index].is_important === 1 ? 0 : 1;
            // Launch API calls.
            if (saveImportant === 1) {
                api.markImportant(articleId);
            } else {
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

    markSeen(id) {
        if (!this.props.authenticated) {
            return;
        }
        this.setState((prevState) => {
            const articles = prevState.articles;
            const index = articles.findIndex(
                (article) => article.uuid === id);
            const uuids = [];
            const copy = [];
            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];
                if (i <= index) {
                    if (article.is_seen === 0) {
                        uuids.push(article.uuid);
                        copy.push(Object.assign({}, article, { is_seen: 1 }));
                    } else {
                        copy.push(article);
                    }
                } else {
                    copy.push(article);
                }
            }
            // Launch the API call.
            api.markSeen(uuids);
            return { articles: copy };
        });
    }

    // Read the article. Marks it read.
    
    read(articleId) {
        if (!this.props.authenticated) {
            const article = this.state.articles.find(
                (article) => article.uuid === articleId);
            window.open(article.link, '_blank').focus();
            return;
        }
        this.setState((prevState) => {
            const index = prevState.articles.findIndex(
                (article) => article.uuid === articleId);
            window.open(prevState.articles[index].link, '_blank').focus();
            api.markRead(articleId);
            return {
                articles: immut.modifyItem(prevState.articles, index, (article) => {
                    return Object.assign({}, article, { is_read: 1, is_seen: 1 });
                })
            };
        });
    }

    // Loads articles. Updates the displayed list of items.

    async load() {
        let source = this.props.source;
        if (source === 'feed') {
            source = `feed/${this.props.args.id}`;
        } else if (source === 'search') {
            source = `search/${encodeURIComponent(this.props.args.query)}`;
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
                rowid: rowid
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
        return (
            <div>
                {this.state.articles.map((article) => {
                    return <Article
                        item={article}
                        key={article.uuid}
                        authenticated={this.props.authenticated}
                        handlers={this.handlers}/>;
                })}
            </div>
        );
    }
};
