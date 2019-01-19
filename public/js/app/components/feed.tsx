import React from 'react';
import Button from './button';
import { FeedStatRow } from '../../../../src/lib/data';

type Props = {
    authenticated: boolean,
    item: FeedStatRow,
    deleteFeed: (feedId: string) => void,
    allSeen: (feedId: string) => void,
    allRead: (feedId: string) => void
};

/**
 * Displays one feed list item.
 */
export default (props: Props) => {
    const item = props.item;
    const authenticated = props.authenticated;
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            {item.unread} unread,
            {item.unseen} unseen,
            {item.important} important
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => props.deleteFeed(item.uuid)}>Delete</Button>
                <Button disabled={!authenticated}
                    onClick={() => props.allSeen(item.uuid)}>All seen</Button>
                <Button disabled={!authenticated}
                    onClick={() => props.allRead(item.uuid)}>All read</Button>
                <Button href={`#feed/${item.uuid}`}>View</Button>
            </div>
        </div>
    );
};
