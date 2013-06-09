var importer = require('../lib/importer');

importer.fromFile(__dirname + '/../list.txt', function(err) {
    if (err) throw err;
});
