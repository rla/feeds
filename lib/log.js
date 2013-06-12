var path = require('path');

// Simple logger that prepends module name
// in the front of the log message.

module.exports = function(mod) {
    var name = path.basename(mod.filename, '.js');
    return function(msg) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift('[' + name + '] ' + msg);
        console.log.apply(null, args);
    };
};