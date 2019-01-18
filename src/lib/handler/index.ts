import { Application } from 'express';
import api from './api';
import front from './front';
import react from './react';

export default (app: Application) => {
    api(app);
    front(app);
    react(app);
};
