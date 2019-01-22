import React from 'react';
import { ArticleData } from '../api';
import Article from './Article';

type Props = {
    authenticated: boolean,
    items: ArticleData[],
    deleteFeed: (articleId: string) => void,
    markRead: (articleId: string) => void,
    markImportant: (articleId: string) => void,
    markSeen: (articleId: string) => void,
    read: (articleId: string) => void
};

/**
 * Displays the list of articles.
 */
export default (props: Props) => {
    return (
        <div>
            {props.items.map((article) => {
                return <Article
                    item={article}
                    key={article.uuid}
                    authenticated={props.authenticated}
                    deleteFeed={props.deleteFeed}
                    markImportant={props.markImportant}
                    markRead={props.markRead}
                    markSeen={props.markSeen}
                    read={props.read}/>;
            })}
        </div>
    );
};
