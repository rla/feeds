import React from 'react';
import { FeedStatRow } from '../../../../src/lib/data';
import Feed from './Feed';

type Props = {
    authenticated: boolean,
    items: FeedStatRow[],
    allRead: (feedId: string) => void,
    allSeen: (feedId: string) => void,
    deleteFeed: (feedId: string) => void
};

export default (props: Props) => {
    return (
        <div>
            {props.items.map((item) => {
                return <Feed
                    item={item}
                    key={item.uuid}
                    authenticated={props.authenticated}
                    allRead={props.allRead}
                    allSeen={props.allSeen}
                    deleteFeed={props.deleteFeed}/>;
            })}
        </div>
    );
};
