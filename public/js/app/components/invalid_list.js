const api = require('../api');
const scroll = require('../scroll');
const Invalid = require('./invalid');

// Helper to handle the invalid feed list display.

module.exports = class InvalidList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0
        };
        this.deleteFeed = this.deleteFeed.bind(this);
        this.resolveFeed = this.resolveFeed.bind(this);
        this.handlers = {
            deleteFeed: this.deleteFeed,
            resolveFeed: this.resolveFeed
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

    // Sets the feed non-invalid.
    
    resolveFeed(feedId) {
        this.setState((prevState) => {
            const index = prevState.items.findIndex(
                (item) => item.uuid === feedId);
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
        this.setState((prevState, props) => {
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
        return (
            <div>
                {this.state.items.map((item) => {
                    return <Invalid
                        item={item}
                        key={item.uuid}
                        authenticated={this.props.authenticated}                        
                        handlers={this.handlers}/>;
                })}
            </div>
        );
    }
};
