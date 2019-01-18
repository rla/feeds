import { Application } from 'express';
import path from 'path';

const MAX_AGE = '30d';

// Serves React and ReactDOM library.

export default (app: Application) => {

    app.get('/js/react/react.js', (req, res) => {
        const file = path.join(__dirname, '..', '..', '..', 'node_modules',
            'react', 'dist', 'react.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });

    app.get('/js/react/react.min.js', (req, res) => {
        const file = path.join(__dirname, '..', '..', '..', 'node_modules',
            'react', 'dist', 'react.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });

    app.get('/js/react/react-dom.js', (req, res) => {
        const file = path.join(__dirname, '..', '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });

    app.get('/js/react/react-dom.min.js', (req, res) => {
        const file = path.join(__dirname, '..', '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.min.js');
        res.sendFile(file, { maxAge: MAX_AGE });
    });
};
