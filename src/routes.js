import { Router } from 'express';
import UserController from './app/controllers/userController.js';


const routes = new Router();

routes.post('/create', UserController.store);

export default routes;
