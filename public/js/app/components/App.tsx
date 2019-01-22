import React from 'react';
import InvalidListContainer from '../containers/InvalidListContainer';
import LoginContainer from '../containers/LoginContainer';
import FeedListContainer from '../containers/FeedListContainer';
import ArticlesContainer from '../containers/ArticlesContainer';
import SearchContainer from '../containers/SearchContainer';
import UrlsContainer from '../containers/UrlsContainer';
import { Display } from '../selectors/route';
import Spinner from './Spinner';
import Menu from './Menu';

type Props = {
    display: Display | null,
    spinner: boolean,
    authenticated: boolean,
    logout: () => void
};

const content = (props: Props) => {
    switch (props.display) {
        case 'invalid':
            return <InvalidListContainer/>;
        case 'feeds':
            return (
                <div>
                    {props.authenticated && <UrlsContainer/>}
                    <FeedListContainer/>
                </div>
            );
        case 'articles':
            return <ArticlesContainer/>;
        case 'search':
            return <SearchContainer/>;
        default:
            return null;
    }
};

export default (props: Props) => {
    return (
        <div>
            <Spinner show={props.spinner}/>
            <Menu logout={props.logout} authenticated={props.authenticated}/>
            {(!props.authenticated && props.display !== 'search') && <LoginContainer/>}
            {content(props)}
        </div>
    );
};
