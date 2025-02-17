import {Router} from 'express';
import {login,createUser,addUser}  from '../controllers/authController';

const API_ROUTE = Router();

API_ROUTE.get('/', (req, res) => {
       res.send('Hello from user routes!');
   });
 

API_ROUTE.post('/login', (req, res) => {
    login(req, res);
});

API_ROUTE.post('/create-user', (req, res) => {
    createUser(req, res);
});

API_ROUTE.post('/user-management', (req, res) => {
    addUser(req, res);
});

export default API_ROUTE;
