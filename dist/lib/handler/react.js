"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const MAX_AGE = '30d';
// Serves React and ReactDOM library.
exports.default = (app) => {
    app.get('/js/react/react.js', (req, res) => {
        const file = path_1.default.join(__dirname, '..', '..', '..', 'node_modules', 'react', 'umd', 'react.development.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });
    app.get('/js/react/react.min.js', (req, res) => {
        const file = path_1.default.join(__dirname, '..', '..', '..', 'node_modules', 'react', 'umd', 'react.production.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });
    app.get('/js/react/react-dom.js', (req, res) => {
        const file = path_1.default.join(__dirname, '..', '..', '..', 'node_modules', 'react-dom', 'umd', 'react-dom.development.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });
    app.get('/js/react/react-dom.min.js', (req, res) => {
        const file = path_1.default.join(__dirname, '..', '..', '..', 'node_modules', 'react-dom', 'umd', 'react-dom.production.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });
};
//# sourceMappingURL=react.js.map