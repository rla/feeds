module.exports = function(app) {
    require('./front')(app);
    require('./api')(app);
    require('./import')(app);
    require('./export')(app);
};
