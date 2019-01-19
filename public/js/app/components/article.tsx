import React from 'react';
import Button from './button';
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

export default (props: Props) => {
    const authenticated = props.authenticated;
    const item = props.item;
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Published {item.date.toISOString().substring(0, 10)} in <a href={`#feed/${item.feed}`}>{item.feed_title}</a>
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => props.deleteFeed(item.uuid)}>Delete feed</Button>
                <Button disabled={!authenticated} inverse={!!item.is_read}
                    onClick={() => props.markRead(item.uuid)}>Mark read</Button>
                <Button disabled={!authenticated} danger={!!item.is_important}
                    onClick={() => props.markImportant(item.uuid)}>Important</Button>
                <Button disabled={!authenticated} inverse={!!item.is_seen}
                    onClick={() => props.markSeen(item.uuid)}>Seen</Button>
                <Button inverse={!!item.is_read}
                    onClick={() => props.read(item.uuid)}>Read</Button>
            </div>
        </div>
    );
};
