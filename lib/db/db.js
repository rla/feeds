var async = require('async');
var sqlite3 = require('sqlite3');
var debug = require('debug')('db');

// Runs queries one by one.

var queue = async.queue(function (fn, cb) {

    fn(cb);

}, 1);

var db;

exports.open = function(filename, cb) {

    debug('Opening database ' + filename);

    if (typeof db !== 'undefined') {

        throw new Error('Database already opened');
    }

    db = new sqlite3.Database(filename, cb);

    db.on('profile', function(sql, ms) {

        debug(sql + ' took ' + ms + 'ms');
    });
};

// Returns new transaction object.
// Serializes queries.

exports.tx = function() {

    var tx = {

        queries: [],

        run: function(fn) {

            this.queries.push(fn);
        },

        execute: function(finalCb) {

            this.queries.push(function(cb) {

                db.run('COMMIT TRANSACTION', function() {

                    cb();

                    if (typeof finalCb === 'function') {

                        finalCb();
                    }
                });

            });

            queue.push(this.queries);
        }
    };

    tx.queries.push(function(cb) {

        db.run('BEGIN TRANSACTION', cb);

    });

    return tx;
};

// Keeps prepared statements.
// These have to be finalized before
// connection can be closed.

var prepared = {};

exports.prepare = function(sql) {

    if (sql in prepared) {

        return prepared[sql];
    }

    return prepared[sql] = db.prepare(sql);
};

// Finalizes all prepared statements
// and closes the connection.

exports.close = function() {

    debug('Closing connection');

    Object.keys(prepared).forEach(function(key) {

        prepared[key].finalize();
    });

    db.close();

    db = null;
};