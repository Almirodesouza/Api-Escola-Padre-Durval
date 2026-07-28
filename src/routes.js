import { Router } from 'express';
import UserController from './app/controllers/Usercontroller.js';
import LoginController from './app/controllers/loginController.js';
import TurmasController from './app/controllers/TurmasController.js';
import authMiddleware from './middlewares/auth.js';


const routes = new Router();

routes.post('/create', UserController.store);
routes.post('/login', LoginController.store);

routes.use(authMiddleware);
routes.post('/turmas', TurmasController.store);
routes.get('/turmas', TurmasController.index);

export default routes;
