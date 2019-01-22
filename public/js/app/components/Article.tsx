import React from 'react';
import Button from './Button';
import { ArticleData } from '../api';

type Props = {
    authenticated: boolean,
    item: ArticleData,
    deleteFeed: (articleId: string) => void,
    markRead: (articleId: string) => void,
    markImportant: (articleId: string) => void,
    markSeen: (articleId: string) => void,
    read: (articleId: string) => void
};

/**
 * Displays single article in a list view of the articles.
 */
export default (props: Props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    const dateString = item.date.toISOString().substring(0, 10);
    const deleteFeed = () => {
        if (props.authenticated) {
            if (confirm(`Delete the feed ${props.item.feed_title}?`)) {
                props.deleteFeed(props.item.uuid);
            }
        }
    };
    const read = () => {
        props.read(props.item.uuid);
        const tab = window.open(props.item.link, '_blank');
        if (tab) {
            tab.focus();
        }
    };
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Published {dateString} in <a href={`#feed/${item.feed}`}>{item.feed_title}</a>
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={deleteFeed}>Delete feed</Button>
                <Button disabled={!authenticated} inverse={!!item.is_read}
                    onClick={() => props.markRead(item.uuid)}>Mark read</Button>
                <Button disabled={!authenticated} danger={!!item.is_important}
                    onClick={() => props.markImportant(item.uuid)}>Important</Button>
                <Button disabled={!authenticated} inverse={!!item.is_seen}
                    onClick={() => props.markSeen(item.uuid)}>Seen</Button>
                <Button inverse={!!item.is_read}
                    onClick={read}>Read</Button>
            </div>
        </div>
    );
};
