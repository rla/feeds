module.exports = (props) => {
    const logout = (e) => {
        e.preventDefault();
        props.onLogout();
    };
    return (
        <ul className='nav nav-pills'>
            <li className={props.menu === 'feeds' ? 'active' : ''}>
                <a href='#feeds'>Feeds</a>
            </li>
            <li className={props.menu === 'unseen' ? 'active' : ''}>
                <a href='#unseen'>Unseen</a>
            </li>
            <li className={props.menu === 'important' ? 'active' : ''}>
                <a href='#important'>Important</a>
            </li>
            <li className={props.menu === 'search' ? 'active' : ''}>
                <a href='#search'>Search</a>
            </li>
            <li className={props.menu === 'invalid' ? 'active' : ''}>
                <a href='#invalid'>Invalid</a>
            </li>
            {props.authenticated && <li>
                <a href='#' onClick={logout}>Logout</a>
            </li>}
        </ul>
    );
};
