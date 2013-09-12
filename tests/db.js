var db = require('../lib/db/db');
var path = require('path');
var assert = require('assert');

describe('Open and close db', function() {

    it('should open db', function(done) {

        var filename = path.join(__dirname, '..', 'db.sqlite');

        db.open(filename, function(err) {

            assert.ifError(err);
            done();
        });
    });

    it('should prepare statement', function() {

        db.prepare('SELECT * FROM feed');
    });

    it('should close db', function() {

        db.close();
    });
});