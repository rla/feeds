import {
    ArticleFeedRow,
    FeedRow,
    FeedStatRow
} from '../../../src/lib/data';

export type ArticleData = ArticleFeedRow & {
    date: Date
};

type LoginResult = {
    ok: boolean
};

// List of handlers to display/hide AJAX spinner.

type SpinnerHandler = (show: boolean) => void;

const handlers: SpinnerHandler[] = [];
let concurrentRequests = 0;

export const addHandler = (cb: SpinnerHandler) => {
    handlers.push(cb);
};

const callHandlers = (show: boolean) => {
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

const handleError = (err: Error) => {
    alert(`API call failed. ${err}`);
    throw err;
};

type ApiResponse = {
    error?: boolean,
    data?: {}
};

// Checks the API response. Throws error
// when the call was not successful.

const checkResponse = (json: ApiResponse) => {
    if (json.error) {
        throw new Error(`API response error: ${json.data}.`);
    }
};

// Small wrapper around the fetch API to
// support AJAX spinner and simple error
// handling and reporting.

const requestFetch = async (url: string, options?: RequestInit) => {
    try {
        startRequest();
        const response = await fetch(url, options);
        const json = await response.json();
        checkResponse(json);
        return json.data as {};
    } catch (err) {
        handleError(err);
    } finally {
        endRequest();
    }
};

/**
 * Helper to create fetch API options
 * to post a JSON body with the given data.
 */
const jsonBodyOptions = (data: {} | undefined) => {
    return {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
};

/**
 * Helper to run a GET request to retrieve data in JSON format.
 */
const getJSON = async (url: string) => {
    return requestFetch(url);
};

/**
 * Helper to post data in JSON format.
 */
const postJSON = async (url: string, data?: {}) => {
    return requestFetch(url, Object.assign({
        method: 'POST',
        credentials: 'include'
    }, jsonBodyOptions(data)));
};

/**
 * Helper to PUT data in JSON format.
 */
const putJSON = async (url: string, data?: {}) => {
    return requestFetch(url, Object.assign({
        method: 'PUT',
        credentials: 'include'
    }, jsonBodyOptions(data)));
};

/**
 * Helper to run a delete request.
 */
const deleteRequest = async (url: string) => {
    return requestFetch(url,
        { method: 'DELETE', credentials: 'include' });
};

/**
 * List of articles from the given source.
 */
export const articles = async (source: string, rowid: number, batch: number) => {
    const articles = (await getJSON(`/${source}/${rowid}/${batch}`)) as ArticleFeedRow[];
    return articles.map((article) => {
        const data: ArticleData = {
            ...article,
            date: new Date(article.published * 1000)
        };
        return data;
    });
};

/**
 * List of invalid feeds.
 */
export const invalid = async (start: number, batch: number) => {
    return getJSON(`/invalid/${start}/${batch}`) as Promise<FeedRow[]>;
};

/**
 * List of all feeds.
 */
export const feeds = async (start: number, batch: number) => {
    return getJSON(`/feeds/${start}/${batch}`) as Promise<FeedStatRow[]>;
};

/**
 * Deletes the given feed.
 */
export const deleteFeed = async (feedId: string) => {
    return deleteRequest(`/feed/${feedId}`);
};

/**
 * Marks the article as read.
 */
export const markRead = async (articleId: string) => {
    return putJSON(`/article/${articleId}/read`);
};

/**
 * Marks the article as unread.
 */
export const markUnread = async (articleId: string) => {
    return putJSON(`/article/${articleId}/unread`);
};

/**
 * Marks the article as important.
 */
export const markImportant = async (articleId: string) => {
    return putJSON(`/article/${articleId}/important`);
};

/**
 * Marks the article as unimportant.
 */
export const markUnimportant = async (articleId: string) => {
    return putJSON(`/article/${articleId}/unimportant`);
};

/**
 * Marks all given articles as seen.
 */
export const markSeen = async (articleIds: string[]) => {
    return putJSON('/seen', articleIds);
};

/**
 * Marks all articles in the feed as seen.
 */
export const seenFeed = async (feedId: string) => {
    return putJSON(`/feed/${feedId}/seen`);
};

/**
 * Marks all articles in the feed as read.
 */
export const readFeed = async (feedId: string) => {
    return putJSON(`/feed/${feedId}/read`);
};

/**
 * Removes errors from the feed.
 */
export const resolveFeed = async (feedId: string) => {
    return putJSON(`/feed/${feedId}/resolve`);
};

/**
 * Adds given feed URLs.
 */
export const addUrls = async (urls: string[]) => {
    return postJSON('/urls', urls);
};

/**
 * Starts an user session.
 */
export const login = async (user: string, pass: string) => {
    const data = { user, pass };
    return ((await postJSON('/login', data)) as LoginResult).ok;
};

/**
 * Ends the user session.
 */
export const logout = async () => {
    return postJSON('/logout');
};

export const BATCH = 30;
