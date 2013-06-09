var async = require('async');
var config = require('../../config.json');
var sqlite3 = require('sqlite3');
var uuid = require('node-uuid');
var log = require('../log')(module);

// Updates database with feeds data.
// Opens database for separate transaction.

module.exports = function(feeds, cb) {
    log('opening %s', config.db);

    var db = new sqlite3.Database(config.db);

    // Prepared statements used in the function.

    var update = db.prepare('UPDATE feed SET title = ? WHERE uuid = ?');
    var save = db.prepare('INSERT INTO article' +
        ' (uuid, feed, id, title, link, published, fetch_time)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?)');

    // Saves single article of the feed.
    // Schema is designed to ignore articles
    // that are already in the database.
    // Logs but otherwise ignores database
    // errors.

    function saveArticle(feed, article, cb) {
        // If date is not set, use current moment.
        if (typeof article.date === 'undefined') {
            article.date = new Date();
        }

        // If id is null, use link as id.
        if (typeof article.id === 'undefined') {
            article.id = article.link;
        }

        // Uses UNIX timestamps.
        var published = Math.floor(article.date.getTime() / 1000);
        var fetchTime = Math.floor(Date.now() / 1000);

        save.run(uuid.v4(), feed.uuid, article.id,
            article.title, article.link, published, fetchTime, function(err) {
                if (err) {
                    log('error while saving article: %s', err);
                }
                cb();
            });
    }

    // Updates feed articles and tries
    // to save all articles.
    // Logs but otherwise ignores database
    // errors.

    function updateFeed(feed, cb) {
        if (typeof feed.uuid === 'undefined') {
            return db(new Error('Feed uuid is not set.'));
        }
        if (typeof feed.title === 'undefined') {
            feed.title = feed.link || 'Untitled';
        }
        async.series([
            function(cb) {
                update.run(feed.title, feed.uuid, function(err) {
                    if (err) {
                        log('error updating feed: %s', err);
                    }
                    cb();
                });
            },
            function(cb) {
                async.eachSeries(feed.items, function(article, cb) {
                    saveArticle(feed, article, cb);
                }, cb);
            }
        ], cb);
    }

    // Runs update in transaction.
    // This makes update much faster.

    var start;

    async.series([
        function(cb) {
            start = Date.now();
            db.run('BEGIN TRANSACTION', cb);
        },
        function(cb) {
            async.eachSeries(feeds, updateFeed, cb);
        }
    ], function(err) {
        // Statements have to be finalized
        // otherwise cannot close the db.
        update.finalize();
        save.finalize();
        log('update took %s ms', Date.now() - start);
        if (err) {
            log('rollback transaction: %s', err);
            db.run('ROLLBACK TRANSACTION', cleanup(db, cb));
        } else {
            log('committing transaction');
            db.run('COMMIT TRANSACTION', cleanup(db, cb));
        }
    });
};

// Cleanup after update.

function cleanup(db, cb) {
    return function(err) {
        if (err) {
            log('error while cleanup: %s', err);
        }
        log('closing database');
        db.close();
        cb(err);
    };
}