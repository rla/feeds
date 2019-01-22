import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

it('renders without crashing', () => {
    shallow((
        <Search
            query='test'
            setQuery={jest.fn()}
            submit={jest.fn()}/>
    ));
});
