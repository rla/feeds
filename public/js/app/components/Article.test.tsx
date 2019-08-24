import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';
import { ArticleData } from '../api';

it('renders without crashing', () => {
  const item: ArticleData = {
    title: 'Test feed',
    link: 'http://example.com',
    uuid: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    article_rowid: 1,
    date: new Date(),
    feed: 'e4161d28-1e43-11e9-ab14-d663bd873d93',
    feed_title: 'Test feed',
    fetch_time: 0,
    id: '123',
    is_important: 0,
    is_read: 0,
    is_seen: 0,
    published: 0,
  };
  shallow(
    <Article
      item={item}
      authenticated={false}
      deleteFeed={jest.fn()}
      markRead={jest.fn()}
      markImportant={jest.fn()}
      markSeen={jest.fn()}
      read={jest.fn()}
    />
  );
});
