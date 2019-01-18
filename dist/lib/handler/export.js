"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const feedRepo = __importStar(require("../repo/feed"));
exports.default = (app) => {
    // Responds list of feed URLs.
    app.get('/export', async (req, res) => {
        try {
            const feeds = await db_1.tx(async (tx) => {
                return feedRepo.all(tx);
            });
            const urls = feeds.map((feed) => feed.url);
            res.set('Content-Type', 'text/plain');
            res.send(urls.join('\n'));
        }
        catch (err) {
            console.error(err);
            res.send(500);
        }
    });
};
//# sourceMappingURL=export.js.map