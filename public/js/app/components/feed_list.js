const api = require('../api');
const scroll = require('../scroll');
const Feed = require('./feed');

// Helper to handle the feeds list display.

module.exports = class FeedList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0
        };
        this.deleteFeed = this.deleteFeed.bind(this);
        this.allSeen = this.allSeen.bind(this);
        this.allRead = this.allRead.bind(this);
        this.handlers = {
            deleteFeed: this.deleteFeed,
            allSeen: this.allSeen,
            allRead: this.allRead
        };
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
        const feed = this.state.items.find(
            (item) => item.uuid === feedId);
        if (confirm(`Delete the feed ${feed.title}?`)) {
            await api.deleteFeed(feedId);
            // Refresh the current view.
            this.refresh();
        }        
    }

    // Marks all feed articles as seen.

    async allSeen(feedId) {
        await api.seenFeed(feedId);
        // Refresh the current view.
        this.refresh();
    }

    // Marks all feed articles as read.
    
    async allRead(feedId) {
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
        return (
            <div>
                {this.state.items.map((item) => {
                    return <Feed
                        item={item}
                        key={item.uuid}
                        authenticated={this.props.authenticated}                        
                        handlers={this.handlers}/>;
                })}
            </div>
        );
    }
};
