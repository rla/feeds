import React from 'react';
import { shallow } from 'enzyme';
import Articles from './Articles';

it('renders without crashing', () => {
  shallow(
    <Articles
      authenticated={false}
      deleteFeed={jest.fn()}
      items={[]}
      markRead={jest.fn()}
      markImportant={jest.fn()}
      markSeen={jest.fn()}
      read={jest.fn()}
    />
  );
});
