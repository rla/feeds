// List of handlers to display/hide AJAX spinner.

const handlers = [];
let concurrentRequests = 0;

exports.addHandler = (cb) => {
    handlers.push(cb);
};

const callHandlers = (show) => {
    for (const handler of handlers) {
        handler(show);
    }
};

const startRequest = () => {
    concurrentRequests += 1;
    if (concurrentRequests === 1) {
        callHandlers(true);
    }
};

const endRequest = () => {
    concurrentRequests -= 1;
    if (concurrentRequests === 0) {
        callHandlers(false);
    }
};

// Very simple error handling that is enough
// for this application. Rethrows errors.

const handleError = (err) => {
    alert(`API call failed. ${err}`);
    throw err;
};

// Checks the API response. Throws error
// when the call was not successful.

const checkResponse = (json) => {
    if (json.error) {
        throw new Error(`API response error: ${json.data}.`);
    }
};

// Helper to run a GET request to retrieve
// data in JSON format.

const getJSON = async (url) => {
    try {
        startRequest();
        const response = await fetch(url);
        const json = await response.json();
        checkResponse(json);
        return json.data;
    } catch (err) {
        handleError(err);
    } finally {
        endRequest();
    }
};

// Helper to post data in JSON format.

const postJSON = async (url, data) => {
    try {
        startRequest();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const json = await response.json();
        checkResponse(json);
        return json.data;
    } catch (err) {
        handleError(err);
    } finally {
        endRequest();
    }
};

// Helper to PUT data in JSON format.

const putJSON = async (url, data) => {
    try {
        startRequest();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data || {}),
            credentials: 'include'
        });
        const json = await response.json();
        checkResponse(json);
        return json.data;
    } catch (err) {
        handleError(err);
    } finally {
        endRequest();
    }
};

// Helper to run a delete request.

const deleteRequest = async (url) => {
    try {
        startRequest();
        const response = await fetch(url,
            { method: 'DELETE', credentials: 'include' });
        const json = await response.json();
        checkResponse(json);
        return json.data;
    } catch (err) {
        handleError(err);
    } finally {
        endRequest();
    }
};

// List of articles from the given source.

exports.articles = async (source, rowid, batch) => {
    const articles = await getJSON(`/${source}/${rowid}/${batch}`);
    for (const article of articles) {
        const date = new Date(article.published * 1000);
        article.date = date.toISOString().substring(0, 10);
    }
    return articles;
};

// List of invalid feeds.

exports.invalid = async (start, batch) => {
    return getJSON(`/invalid/${start}/${batch}`);
};

// List of all feeds.

exports.feeds = async (start, batch) => {
    return getJSON(`/feeds/${start}/${batch}`);
};

// Deletes the given feed.

exports.deleteFeed = async (id) => {
    return deleteRequest(`/feed/${id}`);
};

// Marks the article as read.

exports.markRead = async (articleId) => {
    return putJSON(`/article/${articleId}/read`);
};

// Marks the article as unread.

exports.markUnread = async (articleId) => {
    return putJSON(`/article/${articleId}/unread`);
};

// Marks the article as important.

exports.markImportant = async (articleId) => {
    return putJSON(`/article/${articleId}/important`);
};

// Marks the article as unimportant.

exports.markUnimportant = async (articleId) => {
    return putJSON(`/article/${articleId}/unimportant`);
};

// Marks all given articles as seen.

exports.markSeen = async (articleIds) => {
    return putJSON('/seen', articleIds);
};

// Marks all articles in the feed as seen.

exports.seenFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/seen`);
};

// Marks all articles in the feed as read.

exports.readFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/read`);
};

// Removes errors from the feed.

exports.resolveFeed = async (feedId) => {
    return putJSON(`/feed/${feedId}/resolve`);
};

// Starts an user session.

exports.login = async (user, pass) => {
    const data = { user: user, pass: pass };
    return (await postJSON('/login', data)).ok;
};

exports.BATCH = 30;