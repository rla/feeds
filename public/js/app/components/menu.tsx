import React from 'react';
import { MouseEvent } from 'react';

type Props = {
    onLogout: () => void,
    authenticated: boolean
};

export default (props: Props) => {
    const logout = (e: MouseEvent) => {
        e.preventDefault();
        props.onLogout();
    };
    return (
        <ul className='nav nav-pills'>
            <li><a href='#feeds'>Feeds</a></li>
            <li><a href='#unseen'>Unseen</a></li>
            <li><a href='#important'>Important</a></li>
            <li><a href='#search'>Search</a></li>
            <li><a href='#invalid'>Invalid</a></li>
            {props.authenticated && <li>
                <a href='#' onClick={logout}>Logout</a>
            </li>}
        </ul>
    );
};
