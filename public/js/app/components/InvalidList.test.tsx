import React from 'react';
import { shallow } from 'enzyme';
import InvalidList from './InvalidList';

it('renders without crashing', () => {
    shallow((
        <InvalidList
            authenticated={false}
            deleteFeed={jest.fn()}
            items={[]}
            resolveFeed={jest.fn()}/>
    ));
});
