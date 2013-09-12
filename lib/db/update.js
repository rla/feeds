var db = require('./db');
var data = require('./data');
var async = require('async');
var debug = require('debug')('update');

// Runs database update in a single transaction.

module.exports = function(feeds, cb) {

    debug('Running update');

    var tx = db.tx();

    feeds.forEach(function(feed) {

        if (typeof feed.uuid === 'undefined') {

            return cb(new Error('Feed uuid is not set.'));
        }

        if (typeof feed.title === 'undefined') {

            feed.title = feed.link || 'Untitled';
        }

        tx.run(async.apply(data.feed.updateTitle, feed.uuid, feed.title));

        feed.items.forEach(function(article) {

            article.feedUuid = feed.uuid;

            // If date is not set, use current moment.

            if (typeof article.date === 'undefined') {

                article.date = new Date();
            }

            // If id is null, use link as id.

            if (typeof article.id === 'undefined') {

                article.id = article.link;
            }

            tx.run(function(cb) {

                data.article.save(article, function(err) {

                    if (err) {

                        // Report error to std err.

                        console.error('Feed title: ' + feed.title);
                        console.error('Feed URL: ' + feed.url);
                        console.error('Article: ' + article.title);
                        console.error(err);
                    }

                    cb();
                });
            });
        });
    });

    tx.execute(cb);
};
