CREATE TABLE feed (
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    uuid CHARACTER(36) NOT NULL,
    unread INTEGER NOT NULL DEFAULT 0,
    important INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(uuid) ON CONFLICT REPLACE,
    UNIQUE(url) ON CONFLICT IGNORE
);

CREATE TABLE article (
    uuid CHARACTER(36) NOT NULL,
    feed CHARACTER(36) NOT NULL,
    id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    published INTEGER NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    is_important INTEGER NOT NULL DEFAULT 0,
    fetch_time INTEGER NOT NULL,
    PRIMARY KEY(feed, id) ON CONFLICT IGNORE
);

CREATE VIEW feed_with_stat AS
SELECT
    feed.*,
    (SELECT COUNT(*) FROM article WHERE article.feed = feed.uuid AND is_read = 0) AS unread,
    (SELECT COUNT(*) FROM article WHERE article.feed = feed.uuid AND is_important = 1) AS important
FROM feed;

CREATE VIEW article_with_feed AS
SELECT
    article.*,
    feed.title AS feed_title
FROM article LEFT JOIN feed ON (article.feed = feed.uuid);

-- CREATE INDEX article_uuid_index ON article (uuid);
-- CREATE INDEX article_published_index ON article (published);
-- CREATE INDEX article_is_read_index ON article (is_read);
-- CREATE INDEX article_is_important_index ON article (is_important);

CREATE INDEX article_feed_is_read_index ON article(feed, is_read);