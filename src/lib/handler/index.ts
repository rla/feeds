import { Application } from 'express';
import api from './api';
import front from './front';

export default (app: Application) => {
    api(app);
    front(app);
};
