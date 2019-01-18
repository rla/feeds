"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const packageData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', '..', 'package.json'), 'utf8'));
exports.default = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {
            loggedIn: req.isAuthenticated(),
            version: packageData.version,
            title: config_1.default.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });
    app.get('/old', (req, res) => {
        res.render('old');
    });
};
//# sourceMappingURL=front.js.map