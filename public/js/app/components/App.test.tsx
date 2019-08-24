import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(
    <App
      authenticated={true}
      logout={jest.fn()}
      display="feeds"
      spinner={false}
      allowAnonymousReadonly={true}
    />
  );
});
