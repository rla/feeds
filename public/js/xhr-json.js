// Simple XHR JSON REST library.
// Works on IE's >= IE9. ES5.
// (c) Raivo Laanemets 2013
// MIT license.

var XHRJSON = (function() {

    var module = {
        // Generic request start hook.
        onstart: function() {},

        // Generic request end hook.
        onend: function() {},

        // Generic error hook.
        onerror: function() {}
    };

    // Executes the GET request.
    // cb - called at end.

    module.get = function(url, cb) {
        request('GET', url, cb);
    };

    // Executes the POST request.
    // cb - called at end.

    module.post = function(url, object, cb) {
        if (typeof object !== 'object' && !Array.isArray(object)) {
            throw new Error('Data must be an object or an array.');
        }
        request('POST', url, cb, object);
    };

    // Executes the DELETE request.
    // cb - called at end.

    module.del = module['delete'] = function(url, cb) {
        request('DELETE', url, cb);
    };

    // Executes the PUT request.
    // cb - called at end.

    module.put = function(url, object, cb) {
        if (typeof object !== 'object' && !Array.isArray(object)) {
            throw new Error('Data must be an object or an array.');
        }
        request('PUT', url, cb, object);
    };

    // Creates new HTTP request.

    function request(method, url, cb, payload) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = ready(xhr, cb);
        if (payload) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(payload));
        } else {
            xhr.send();
        }
        // Call the generic start hook.
        module.onstart(xhr);
    }

    // Returns a function to use with
    // built-in XHR's onreadystatechange.

    function ready(xhr, cb) {
        return function() {
            if (xhr.readyState === 4) {
                // Call the generic end hook.
                module.onend(xhr);
                if (xhr.status === 200) {
                    // Call the callback with the JSON from responseText.
                    if (typeof cb === 'function') {
                        cb(null, JSON.parse(xhr.responseText));
                    }
                } else {
                    // Call the generic error hook.
                    module.onerror(xhr);
                    // Call the callback with error.
                    if (typeof cb === 'function') {
                        cb(new Error('Status code not 200.'));
                    }
                }
            }
        };
    }

    return module;
})();

// CommonJS support.

if (typeof module !== 'undefined' && module.exports) {
    module.exports = XHRJSON;
}