var path = require('path');
var logger = require('morgan');
var express = require('express');
var cookies = require('./cookies');
var session = require('./session');
var buster = require('./buster');

module.exports = function(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use(logger('dev'));
    }
    app.use(buster());
    var staticOptions = {};
    if (process.env.NODE_ENV === 'production') {
        staticOptions.maxAge = '30d';
    }
    app.use(express.static(
        path.join(__dirname, '..', '..', 'public'),
        staticOptions));
    app.use(cookies());
    app.use(session());
};