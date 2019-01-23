import React from 'react';
import Button from './Button';
import { FeedRow } from '../../../../src/lib/data';

type Props = {
    authenticated: boolean,
    item: FeedRow,
    deleteFeed: (feedId: string) => void,
    resolveFeed: (feedId: string) => void
};

/**
 * Displays one invalid feed list item.
 */
export default (props: Props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    const deleteFeed = () => {
        if (props.authenticated) {
            if (confirm(`Delete the feed ${item.title}?`)) {
                props.deleteFeed(item.uuid);
            }
        }
    };
    const resolveFeed = () => {
        if (props.authenticated) {
            props.resolveFeed(item.uuid);
        }
    };
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Error: {item.error}
            <div className='buttons'>
                <Button disabled={!authenticated} onClick={deleteFeed}>Delete</Button>
                <Button disabled={!authenticated} onClick={resolveFeed}>Resolve</Button>
                <Button href={`#feed/${item.uuid}`}>View</Button>
            </div>
        </div>
    );
};
