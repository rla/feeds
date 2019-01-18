import { Application } from 'express';
import { tx, Transaction } from '../db';
import * as feedRepo from '../repo/feed';

export default (app: Application) => {

    // Responds list of feed URLs.
    app.get('/export', async (req, res) => {
        try {
            const feeds = await tx(async (tx) => {
                return feedRepo.all(tx);
            });
            const urls = feeds.map((feed) => feed.url);
            res.set('Content-Type', 'text/plain');
            res.send(urls.join('\n'));
        } catch (err) {
            console.error(err);
            res.send(500);
        }
    });
};
