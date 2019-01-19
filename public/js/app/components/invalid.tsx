import React from 'react';
import Button from './button';
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
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Error: {item.error}
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => props.deleteFeed(item.uuid)}>Delete</Button>
                <Button disabled={!authenticated}
                    onClick={() => props.resolveFeed(item.uuid)}>Resolve</Button>
                <Button href={`#feed/${item.uuid}`}>View</Button>
            </div>
        </div>
    );
};
