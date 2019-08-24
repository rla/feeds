import React from 'react';
import Button from './Button';
import { FeedStatRow } from '../../../../src/lib/data';

type Props = {
  authenticated: boolean;
  item: FeedStatRow;
  deleteFeed: (feedId: string) => void;
  allSeen: (feedId: string) => void;
  allRead: (feedId: string) => void;
};

/**
 * Displays one feed list item.
 */
export default (props: Props) => {
  const item = props.item;
  const authenticated = props.authenticated;
  const deleteFeed = () => {
    if (authenticated) {
      if (confirm(`Delete the feed ${item.title}?`)) {
        props.deleteFeed(item.uuid);
      }
    }
  };
  const allSeen = () => {
    if (props.authenticated) {
      props.allSeen(item.uuid);
    }
  };
  const allRead = () => {
    if (props.authenticated) {
      props.allRead(item.uuid);
    }
  };
  return (
    <div className="well well-small">
      <strong>{item.title}</strong>
      <br />
      {item.unread} unread,
      {item.unseen} unseen,
      {item.important} important
      <div className="buttons">
        <Button disabled={!authenticated} onClick={deleteFeed}>
          Delete
        </Button>
        <Button disabled={!authenticated} onClick={allSeen}>
          All seen
        </Button>
        <Button disabled={!authenticated} onClick={allRead}>
          All read
        </Button>
        <Button href={`#feed/${item.uuid}`}>View</Button>
      </div>
    </div>
  );
};
