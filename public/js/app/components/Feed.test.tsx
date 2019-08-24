import React from 'react';
import { shallow } from 'enzyme';
import Feed from './Feed';
import { FeedStatRow } from '../../../../src/lib/data';

it('renders without crashing', () => {
  const item: FeedStatRow = {
    title: 'Test feed',
    url: 'http://example.com',
    uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    error: null,
    important: 0,
    unread: 0,
    unseen: 0,
  };
  shallow(
    <Feed
      item={item}
      authenticated={false}
      deleteFeed={jest.fn()}
      allSeen={jest.fn()}
      allRead={jest.fn()}
    />
  );
});
