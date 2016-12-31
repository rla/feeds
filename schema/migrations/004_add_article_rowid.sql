DROP VIEW article_with_feed;
CREATE VIEW article_with_feed AS
SELECT
    article.*,
    article.ROWID AS article_rowid,
    feed.title AS feed_title
FROM article LEFT JOIN feed ON (article.feed = feed.uuid);
