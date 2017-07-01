const Button = require('./button');

// Displays one feed list item.

module.exports = (props) => {
    const item = props.item;
    const handlers = props.handlers;
    const authenticated = props.authenticated;
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            {item.unread} unread,
            {item.unseen} unseen,
            {item.important} important
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => handlers.deleteFeed(item.uuid)}>Delete</Button>
                <Button disabled={!authenticated}
                    onClick={() => handlers.allSeen(item.uuid)}>All seen</Button>
                <Button disabled={!authenticated}
                    onClick={() => handlers.allRead(item.uuid)}>All read</Button>
                <Button href={`#feed/${item.uuid}`}>View</Button>                
            </div>
        </div>
    );
};
