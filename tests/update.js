var db = require('../lib/db/db');
var update = require('../lib/db/update');
var path = require('path');
var assert = require('assert');

describe('Update a batch of feeds', function() {

    it('should open db', function(done) {

        var filename = path.join(__dirname, '..', 'db.sqlite');

        db.open(filename, function(err) {

            assert.ifError(err);
            done();
        });
    });

    it('should update feeds', function(done) {

        var feeds = [
            {
                title: 'Feed 1',
                uuid: 'abc-12345',
                items: [
                    {
                        title: 'Article 1-1',
                        id: '1001',
                        link: 'http://article/1001'
                    },
                    {
                        title: 'Article 1-2',
                        id: '1002',
                        link: 'http://article/1002'
                    }
                ]
            },
            {
                title: 'Feed 2',
                uuid: 'abc-9876543',
                items: [
                    {
                        title: 'Article 2-1',
                        id: '1003',
                        link: 'http://article/2001'
                    },
                    {
                        title: 'Article 2-2',
                        id: '1004',
                        link: 'http://article/2002'
                    }
                ]
            }
        ];

        update(feeds, done);
    });

    it('should close db', function() {

        db.close();
    });
});