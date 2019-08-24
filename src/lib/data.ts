// Database records.

export type FeedRow = {
  url: string;
  title: string | null;
  uuid: string;
  error: string | null;
};

export type FeedStatRow = FeedRow & {
  unread: number;
  important: number;
  unseen: number;
};

// TODO Convert number to boolean for some properties.

export type ArticleRow = {
  uuid: string;
  feed: string;
  id: string;
  title: string;
  link: string;
  published: number;
  fetch_time: number;
  is_read: number;
  is_important: number;
  is_seen: number;
};

export type ArticleFeedRow = ArticleRow & {
  article_rowid: number;
  feed_title: string;
};

export type FeedArticle = {
  id: string;
  title: string;
  link: string;
  feedUuid: string;
  date: Date;
};

// Fetch in/out data types.

export type FetchFeedIn = {
  url: string;
  uuid: string;
};

export type FetchFeedOut = {
  url: string;
  uuid: string;
  id: string | null;
  title: string | null;
  link: string | null;
  items: FetchArticle[];
};

export type FetchArticle = {
  id: string | null;
  title: string | null;
  link: string | null;
  date: Date | null;
};

export type FetchError = {
  url: string;
  uuid: string;
  err: string;
};

export type FetchResult = {
  feeds: FetchFeedOut[];
  errors: FetchError[];
};
