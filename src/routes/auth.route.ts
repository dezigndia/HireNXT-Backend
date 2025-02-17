
import { AuthController } from '@controllers';
import {Router} from 'express';

const AUTH_ROUTE = Router();
const authController = new AuthController()

AUTH_ROUTE.post('/login', [], authController.login);

export default AUTH_ROUTE;