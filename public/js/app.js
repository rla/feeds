var app = {

    // Offset in current view.
    start: 0,

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

    // Shows/hides loading spinner.
    spin: ko.observable(false),

    // Marks article read.
    // Opens in new tab/window.
    read: function(article) {
        var win = window.open(article.link, '_blank');
        win.focus();
        article.is_read(1);
        XHRJSON.put('/article/' + article.uuid + '/read', {});
    },

    // Marks article read/unread, does not open it.
    markRead: function(article) {
        if (article.is_read() === 1) {
            article.is_read(0);
            XHRJSON.put('/article/' + article.uuid + '/unread', {});
        } else {
            article.is_read(1);
            XHRJSON.put('/article/' + article.uuid + '/read', {});
        }
    },

    // Marks all feed articles read.
    allRead: function(feed) {
        XHRJSON.put('/feed/' + feed.uuid + '/read', {});
        feed.unread(0);
    },

    // Marks article important/unimportant.
    important: function(article) {
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
        var url = '/' + self.what + '/' + self.start + '/30';
        XHRJSON.get(url, function(err, articles) {
            if (err) { return; }
            var mapping = {
                observe: [ 'is_read', 'is_important' ]
            };
            articles.forEach(function(article) {
                var date = new Date(article.published * 1000);
                article.date = date.toISOString().substring(0, 10);
                article.title = article.title || '';
                article.title = article.title.replace(/<[^>]+>/g, '');
                self.array.push(ko.mapping.fromJS(article, mapping));
            });
            self.start += 30;
        });
    },

    // Loads batch of feeds.
    loadFeeds: function() {
        var self = this;
        var url = '/feeds/' + self.start + '/30';
        XHRJSON.get(url, function(err, feeds) {
            if (err) { return; }
            var mapping = {
                observe: [ 'unread' ]
            };
            feeds.forEach(function(feed) {
                self.array.push(ko.mapping.fromJS(feed, mapping));
            });
            self.start += 30;
        });
    },

    // Resets current collection.
    // Loads first batch.
    reload: function() {
        this.array.removeAll();
        this.start = 0;
        this.load();
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

route(/.*/, function() {
    route.go('feeds');
});

// Infinite scroll.
// Not cross-browser.
// Tested in FF 16, Chrome 2x?, Android 4.x.

var last = 0;
document.addEventListener('scroll', function(event) {
    var offset = window.pageYOffset;
    var total = document.body.scrollHeight;
    var win = window.innerHeight;
    if (offset > (total - win - 100) && total !== last) {
        last = total;
        app.more();
    }
}, false);