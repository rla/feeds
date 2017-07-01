const Button = require('./button');

module.exports = (props) => {
    const authenticated = props.authenticated;    
    const handlers = props.handlers;
    const item = props.item;
    return (
        <div className='well well-small'>
            <strong>{item.title}</strong><br/>
            Published {item.date} in <a href={`#feed/${item.feed}`}>{item.feed_title}</a>
            <div className='buttons'>
                <Button disabled={!authenticated}
                    onClick={() => handlers.deleteFeed(item.uuid)}>Delete feed</Button>
                <Button disabled={!authenticated} inverse={item.is_read}
                    onClick={() => handlers.markRead(item.uuid)}>Mark read</Button>
                <Button disabled={!authenticated} danger={item.is_important}
                    onClick={() => handlers.markImportant(item.uuid)}>Important</Button>
                <Button disabled={!authenticated} inverse={item.is_seen}
                    onClick={() => handlers.markSeen(item.uuid)}>Seen</Button>
                <Button inverse={item.is_read}
                    onClick={() => handlers.read(item.uuid)}>Read</Button>
            </div>
        </div>
    );
};
