var data = require('./db/data');
var debug = require('debug')('fetch');
var db = require('./db/db');
var spawn = require('child_process').spawn;
var path = require('path');
var split = require('split');

// Runs feed fetching and parsing
// as a separate NodeJS process.

module.exports = function(feeds, cb) {

    var script = path.join(__dirname, 'fetch', 'app.js');
    var fetchApp = spawn('node', [ script ]);
    var results = [], errors = [];

    fetchApp.stdout.pipe(split()).on('data', function(line) {

        if (!line) {

            return;
        }

        var obj = JSON.parse(line);

        if (obj.type === 'error') {

            errors.push(obj.data);

            console.error('Feed ' + obj.data.url);
            console.error(obj.data.err);

        } else if (obj.type === 'feed') {

            debug('Got feed ' + obj.data.title.trim());

            obj.data.items.forEach(function(article) {

                // Parse date.

                article.date = new Date(article.date);
            });

            results.push(obj.data);
        }
    });

    fetchApp.stderr.on('data', function(data) {

        process.stderr.write(data);
    });

    fetchApp.on('close', function() {

        saveErrors(errors);

        cb(null, results);
    });

    fetchApp.stdin.write(JSON.stringify(feeds) + '\n');
};

function saveErrors(errors) {

    var tx = db.tx();

    tx.run(function(cb) {

        data.feed.clearErrors(cb);
    });

    errors.forEach(function(error) {

        tx.run(function(cb) {

            data.feed.mark(error.uuid, error.err, cb);
        });
    });

    tx.execute();
}
