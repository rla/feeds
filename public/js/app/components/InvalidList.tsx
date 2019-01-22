import React from 'react';
import Invalid from './Invalid';
import { FeedRow } from '../../../../src/lib/data';

type Props = {
    authenticated: boolean,
    items: FeedRow[],
    deleteFeed: (feedId: string) => void,
    resolveFeed: (feedId: string) => void
};

/**
 * Helper to handle the invalid feed list display.
 */
export default (props: Props) => {
    return (
        <div>
            {props.items.map((item) => {
                return <Invalid
                    item={item}
                    key={item.uuid}
                    authenticated={props.authenticated}
                    deleteFeed={props.deleteFeed}
                    resolveFeed={props.resolveFeed}/>;
            })}
        </div>
    );
};
