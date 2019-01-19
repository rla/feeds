import React from 'react';
import * as api from '../api';
import * as scroll from '../scroll';
import Feed from './feed';
import { FeedStatRow } from '../../../../src/lib/data';

type Props = {
    authenticated: boolean
};

type State = {
    items: FeedStatRow[],
    start: number
};

/**
 * Helper to handle the feeds list display.
 */
export default class FeedList extends React.Component<Props, State> {

    constructor(props: Props) {
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

    // Marks all feed articles as seen.

    async allSeen(feedId: string) {
        if (!this.props.authenticated) {
            return;
        }
        await api.seenFeed(feedId);
        // Refresh the current view.
        this.refresh();
    }

    // Marks all feed articles as read.

    async allRead(feedId: string) {
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
        return (
            <div>
                {this.state.items.map((item) => {
                    return <Feed
                        item={item}
                        key={item.uuid}
                        authenticated={this.props.authenticated}
                        allRead={this.allRead}
                        allSeen={this.allSeen}
                        deleteFeed={this.deleteFeed}/>;
                })}
            </div>
        );
    }
}
