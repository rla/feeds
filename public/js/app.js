// Infinite scroll.
// Not cross-browser.
// Tested in FF 16, Chrome 2x?, Android 4.x.
// Throttles event in 5s.

var scroll = (function() {
    var throttle = false;
    var lastOffset = 0; // used for detecting direction.
    document.addEventListener('scroll', function(event) {
        var offset = window.pageYOffset;
        var total = document.body.scrollHeight;
        var win = window.innerHeight;
        var toBotton = offset > lastOffset;
        lastOffset = offset;
        var atBottom = offset > (total - win - 100);
        if (toBotton && atBottom && !throttle) {
            console.log('infinite scroll toggled load');
            throttle = true;
            app.more();
            setTimeout(function() {
                throttle = false;
            }, 5000);
        }
    }, false);
    return {};
})();

// The main app object.

var app = {

    // Offset in current view.
    start: 0,

    // Size of load batch.
    batch: 15,

    // Current view type (article or feed).
    type: ko.observable('article'),

    // Current view items.
    array: ko.observableArray(),

    // When articles then source name.
    what: 'unread',

    // Selected menu item.
    menu: ko.observable(),

    // Called at the end of scroll.
    // Calls app.load function.
    more: function() {
        this.load();
    },

    // User authenticated or not.
    authed: ko.observable(false),

    // Currently entered username.
    user: ko.observable(),

    // Currently entered password.
    pass: ko.observable(),

    // Shows/hides loading spinner.
    spin: ko.observable(false),

    // Currently entered search query.
    query: ko.observable(''),

    // Marks article read.
    // Opens in new tab/window.
    // Only does something when authenticated.
    read: function(article) {
        if (app.authed()) {
            article.is_read(1);
            article.is_seen(1);
            XHRJSON.put('/article/' + article.uuid + '/read', {});
        }
        var win = window.open(article.link, '_blank');
        win.focus();
    },

    // Marks all current articles from
    // top, down to the given article, as seen.
    seenTop: function(article) {
        if (!app.authed()) { return; }
        var arr = app.array();
        var uuids = [];
        for (var i = 0; i < arr.length; i++) {
            var top = arr[i];
            if (top.is_seen() === 0) {
                top.is_seen(1);
                uuids.push(top.uuid);
            }
            if (article === top) {
                break;
            }
        }
        XHRJSON.put('/seen', uuids);
    },

    // Marks article read/unread, does not open it.
    // Only does something when authenticated.
    markRead: function(article) {
        if (!app.authed()) { return; }
        if (article.is_read() === 1) {
            article.is_read(0);
            XHRJSON.put('/article/' + article.uuid + '/unread', {});
        } else {
            article.is_read(1);
            article.is_seen(1);
            XHRJSON.put('/article/' + article.uuid + '/read', {});
        }
    },

    // Marks all feed articles read.
    // Only does something when authenticated.
    allRead: function(feed) {
        if (!app.authed()) { return; }
        XHRJSON.put('/feed/' + feed.uuid + '/read', {});
        feed.unread(0);
    },

    // Marks all feed articles seen.
    // Only does something when authenticated.
    allSeen: function(feed) {
        if (!app.authed()) { return; }
        XHRJSON.put('/feed/' + feed.uuid + '/seen', {});
        feed.unseen(0);
    },

    // Marks article important/unimportant.
    // Only does something when authenticated.
    important: function(article) {
        if (!app.authed()) { return; }
        if (article.is_important() === 1) {
            article.is_important(0);
            XHRJSON.put('/article/' + article.uuid + '/unimportant', {});
        } else {
            article.is_important(1);
            XHRJSON.put('/article/' + article.uuid + '/important', {});
        }
    },

    // Loads batch of articles.
    // What to load, depends on app.what.
    loadArticles: function() {
        var self = this;
        var url = '/' + self.what + '/' + self.start + '/' + self.batch;
        XHRJSON.get(url, function(err, result) {
            if (err || result.error) { return; }
            self.appendRawArticles(result.data);
        });
    },

    // Loads batch of search results.
    loadSearch: function() {
        var self = this;
        var query = encodeURIComponent(self.query());
        var url = '/search/' + query + '/' + self.start + '/' + self.batch;
        XHRJSON.get(url, function(err, result) {
            if (err || result.error) { return; }
            self.appendRawArticles(result.data);
        });
    },

    // Appends raw articles to the view.
    appendRawArticles: function(articles) {
        var self = this;
        var mapping = {
            observe: [ 'is_read', 'is_important', 'is_seen' ]
        };
        articles.forEach(function(article) {
            var date = new Date(article.published * 1000);
            article.date = date.toISOString().substring(0, 10);
            article.title = article.title || '';
            article.title = article.title.replace(/<[^>]+>/g, '');
            self.array.push(ko.mapping.fromJS(article, mapping));
        });
        self.start += articles.length;
    },

    // Runs search.
    search: function(form) {
        route.go('search', encodeURIComponent(form.elements.query.value));
    },

    // Loads batch of feeds.
    loadFeeds: function() {
        var self = this;
        var url = '/feeds/' + self.start + '/' + self.batch;
        XHRJSON.get(url, function(err, result) {
            if (err || result.error) { return; }
            var mapping = {
                observe: [ 'unread', 'unseen' ]
            };
            result.data.forEach(function(feed) {
                self.array.push(ko.mapping.fromJS(feed, mapping));
            });
            self.start += 30;
        });
    },

    // Resets current collection.
    // Loads first batch.
    reload: function() {
        this.reset();
        this.load();
    },

    // Cleans the current view.
    reset: function() {
        this.array.removeAll();
        this.start = 0;
    },

    // Helper to display given feed articles.
    // Routes to feed/uuid.
    viewFeed: function(feed) {
        route.go('feed/' + feed.uuid);
    },

    // Helper to display given feed articles.
    // Link from article.
    viewArticleFeed: function(article) {
        route.go('feed/' + article.feed);
    },

    // Authenticates the user with
    // the currently entered username and password.
    // XXX we have to read values directly
    // as they might have been autofilled which
    // does not trigger change events.
    login: function(form) {
        var self = this;
        var inputs = form.elements;
        XHRJSON.post('/login', {
            user: inputs.user.value,
            pass: inputs.pass.value
        }, function(err, result) {
            if (!err && !result.error && result.data.ok) {
                self.authed(true);
            }
        });
    },

    // Deauthenticates the user.
    logout: function() {
        var self = this;
        XHRJSON.post('/logout', {}, function(err, result) {
            if (!err && !result.error) {
                self.authed(false);
            }
        });
    }
};

ko.applyBindings(app);

// Initializes the busy spinner.

(function initSpinner() {
    var loading = 0;
    XHRJSON.onstart = function() {
        loading++;
        if (loading === 1) {
            app.spin(true);
        }
    };
    XHRJSON.onend = function() {
        loading--;
        if (loading === 0) {
            app.spin(false);
        }
    };
})();

// In-app routing.
// In each route:
// set view type;
// set article source (when articles);
// set load function;
// reload collection.

route(/^important/, function() {
    app.type('article');
    app.what = 'important';
    app.menu('important');
    app.load = app.loadArticles;
    app.reload();
});

route(/^all/, function() {
    app.type('article');
    app.what = 'articles';
    app.menu('all');
    app.load = app.loadArticles;
    app.reload();
});

route(/^unread/, function() {
    app.type('article');
    app.what = 'unread';
    app.menu('unread');
    app.load = app.loadArticles;
    app.reload();
});

route(/^unseen/, function() {
    app.type('article');
    app.what = 'unseen';
    app.menu('unseen');
    app.load = app.loadArticles;
    app.reload();
});

route(/^feeds/, function() {
    app.type('feed');
    app.menu('feeds');
    app.load = app.loadFeeds;
    app.reload();
});

route(/^feed\/([A-Za-z0-9\-]+)/, function(uuid) {
    app.type('article');
    app.what = 'feed/' + uuid;
    app.menu('feeds');
    app.load = app.loadArticles;
    app.reload();
});

route(/^search$/, function() {
    app.type('article');
    app.menu('search');
    app.query('');
    app.load = app.loadSearch;
    app.reset();
});

route(/^search\/(.+)/, function(query) {
    app.type('article');
    app.menu('search');
    app.load = app.loadSearch;
    app.query(decodeURIComponent(query));
    app.reload();
});

route(/.*/, function() {
    route.go('unseen');
});

app.authed(window.loggedIn);