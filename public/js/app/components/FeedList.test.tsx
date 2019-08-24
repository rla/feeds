import React from 'react';
import { shallow } from 'enzyme';
import FeedList from './FeedList';

it('renders without crashing', () => {
  shallow(
    <FeedList
      authenticated={false}
      deleteFeed={jest.fn()}
      items={[]}
      allRead={jest.fn()}
      allSeen={jest.fn()}
    />
  );
});
