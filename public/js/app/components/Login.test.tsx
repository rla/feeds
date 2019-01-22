import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

it('renders without crashing', () => {
    shallow((
        <Login
            user='test'
            pass='test'
            submit={jest.fn()}
            setUser={jest.fn()}
            setPass={jest.fn()}/>
    ));
});
