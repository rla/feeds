import React from 'react';
import { shallow } from 'enzyme';
import Urls from './Urls';

it('renders without crashing', () => {
    shallow((
        <Urls
            submit={jest.fn()}
            setText={jest.fn()}
            text='test'/>
    ));
});
