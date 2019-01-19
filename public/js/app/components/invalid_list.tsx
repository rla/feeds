import React from 'react';
import * as api from '../api';
import * as scroll from '../scroll';
import Invalid from './invalid';
import { FeedRow } from '../../../../src/lib/data';

type Props = {
    authenticated: boolean
};

type State = {
    items: FeedRow[],
    start: number
};

/**
 * Helper to handle the invalid feed list display.
 */
export default class InvalidList extends React.Component<Props, State> {

    constructor(props: Props) {
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

    async deleteFeed(feedId: string) {
        if (!this.props.authenticated) {
            return;
        }
        const feed = this.state.items.find(
            (item) => item.uuid === feedId);
        if (feed) {
            if (confirm(`Delete the feed ${feed.title}?`)) {
                await api.deleteFeed(feedId);
                // Refresh the current view.
                this.refresh();
            }
        }
    }

    // Sets the feed non-invalid.

    resolveFeed(feedId: string) {
        if (!this.props.authenticated) {
            return;
        }
        // TODO use immutable.js
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
        return (
            <div>
                {this.state.items.map((item) => {
                    return <Invalid
                        item={item}
                        key={item.uuid}
                        authenticated={this.props.authenticated}
                        deleteFeed={this.deleteFeed}
                        resolveFeed={this.resolveFeed}/>;
                })}
            </div>
        );
    }
}
