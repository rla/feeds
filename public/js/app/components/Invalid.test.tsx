import React from 'react';
import { shallow } from 'enzyme';
import Invalid from './Invalid';
import { FeedRow } from '../../../../src/lib/data';

it('renders without crashing', () => {
    const item: FeedRow = {
        error: null,
        title: 'Test feed',
        url: 'http://example.com',
        uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93'
    };
    shallow((
        <Invalid
            item={item}
            authenticated={false}
            deleteFeed={jest.fn()}
            resolveFeed={jest.fn()}/>
    ));
});
