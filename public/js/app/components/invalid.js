const Button = require('./button');

// Displays one invalid feed list item.

module.exports = (props) => {
    const authenticated = props.authenticated;
    const handlers = props.handlers;
    const item = props.item;    
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Error: {item.error}
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => handlers.deleteFeed(item.uuid)}>Delete</Button>
                <Button disabled={!authenticated}
                    onClick={() => handlers.resolveFeed(item.uuid)}>Resolve</Button>
                <Button href={`#feed/${item.uuid}`}>View</Button>
            </div>
        </div>
    );
};
