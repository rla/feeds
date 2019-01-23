import buster from './buster';
import { Request, Response } from 'express';

it('should rewrite the request url', () => {
    const req = {
        url: '/v-1.2.3/public/app.js'
    };
    const next = jest.fn();
    buster()(req as Request, {} as Response, next);
    expect(req.url).toBe('/public/app.js');
    expect(next).toBeCalled();
});

it('should not rewrite the request url', () => {
    const req = {
        url: '/public/app.js'
    };
    const next = jest.fn();
    buster()(req as Request, {} as Response, next);
    expect(req.url).toBe('/public/app.js');
    expect(next).toBeCalled();
});
