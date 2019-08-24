import { ArticleFeedRow, FeedRow, FeedStatRow } from '../../../src/lib/data';

export type ArticleData = ArticleFeedRow & {
  date: Date;
};

type LoginResult = {
  ok: boolean;
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
  error?: boolean;
  data?: {};
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
    return {};
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
    body: JSON.stringify(data),
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
  return requestFetch(
    url,
    Object.assign(
      {
        method: 'POST',
        credentials: 'include',
      },
      jsonBodyOptions(data)
    )
  );
};

/**
 * Helper to PUT data in JSON format.
 */
const putJSON = async (url: string, data?: {}) => {
  return requestFetch(
    url,
    Object.assign(
      {
        method: 'PUT',
        credentials: 'include',
      },
      jsonBodyOptions(data)
    )
  );
};

/**
 * Helper to run a delete request.
 */
const deleteRequest = async (url: string) => {
  await requestFetch(url, { method: 'DELETE', credentials: 'include' });
};

/**
 * List of articles from the given source.
 */
export const articles = async (source: string, rowid: number, batch: number) => {
  const articles = (await getJSON(`/${source}/${rowid}/${batch}`)) as ArticleFeedRow[];
  return articles.map(article => {
    const data: ArticleData = {
      ...article,
      date: new Date(article.published * 1000),
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
  await putJSON(`/article/${articleId}/read`);
};

/**
 * Marks the article as unread.
 */
export const markUnread = async (articleId: string) => {
  await putJSON(`/article/${articleId}/unread`);
};

/**
 * Marks the article as important.
 */
export const markImportant = async (articleId: string) => {
  await putJSON(`/article/${articleId}/important`);
};

/**
 * Marks the article as unimportant.
 */
export const markUnimportant = async (articleId: string) => {
  await putJSON(`/article/${articleId}/unimportant`);
};

/**
 * Marks all given articles as seen.
 */
export const markSeen = async (articleIds: string[]) => {
  await putJSON('/seen', articleIds);
};

/**
 * Marks all articles in the feed as seen.
 */
export const seenFeed = async (feedId: string) => {
  await putJSON(`/feed/${feedId}/seen`);
};

/**
 * Marks all articles in the feed as read.
 */
export const readFeed = async (feedId: string) => {
  await putJSON(`/feed/${feedId}/read`);
};

/**
 * Removes errors from the feed.
 */
export const resolveFeed = async (feedId: string) => {
  await putJSON(`/feed/${feedId}/resolve`);
};

/**
 * Adds given feed URLs.
 */
export const addUrls = async (urls: string[]) => {
  await postJSON('/urls', urls);
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
  await postJSON('/logout');
};

// TODO: refactor out.
export const BATCH = 30;

/**
 * Type for the API. Used for creating a typesafe mock for testing.
 */
export type Api = {
  articles: (source: string, rowid: number, batch: number) => Promise<ArticleData[]>;
  invalid: (start: number, batch: number) => Promise<FeedRow[]>;
  feeds: (start: number, batch: number) => Promise<FeedStatRow[]>;
  deleteFeed: (feedId: string) => Promise<void>;
  markRead: (articleId: string) => Promise<void>;
  markUnread: (articleId: string) => Promise<void>;
  markImportant: (articleId: string) => Promise<void>;
  markUnimportant: (articleId: string) => Promise<void>;
  markSeen: (articleIds: string[]) => Promise<void>;
  seenFeed: (feedId: string) => Promise<void>;
  readFeed: (feedId: string) => Promise<void>;
  resolveFeed: (feedId: string) => Promise<void>;
  addUrls: (urls: string[]) => Promise<void>;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  BATCH: number;
};

export const api: Api = {
  articles,
  invalid,
  feeds,
  deleteFeed,
  markRead,
  markUnread,
  markImportant,
  markUnimportant,
  markSeen,
  seenFeed,
  readFeed,
  resolveFeed,
  addUrls,
  login,
  logout,
  BATCH,
};
