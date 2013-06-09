var config = require('../../config.json');
var sqlite3 = require('sqlite3');
var log = require('../log')(module);

log('opening database %s', config.db);

module.exports = new sqlite3.Database(config.db);