import { Request } from 'express';

export type AppRequest = Request & {
    setAuthenticated: (isAuthed: boolean) => void,
    isAuthenticated: () => boolean
};
