import { Api } from '../../api';

// tslint:disable: no-empty
export const mockApi: Api = {
    addUrls: async () => {},
    articles: async () => [],
    deleteFeed: async () => {},
    feeds: async () => [],
    invalid: async () => [],
    login: async () => true,
    logout: async () => {},
    markImportant: async () => {},
    markRead: async () => {},
    markSeen: async () => {},
    markUnimportant: async () => {},
    markUnread: async () => {},
    readFeed: async () => {},
    resolveFeed: async () => {},
    seenFeed: async () => {},
    BATCH: 30
};
