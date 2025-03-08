import {Router} from 'express';
import {login,createUser,addUser, getUser}  from '../controllers/authController';

const API_ROUTE = Router();

API_ROUTE.get('/', (req, res) => {
       res.send('Hello from user routes!');
   });
 
/**
 * @api {get} /login/{"email":"sripadbal@gmail.com","password":"1234"} Request User information
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {req} request User's unique ID.
 *
 * @apiSuccess {String} JWT Token of the User.
 */
API_ROUTE.post('/login', (req, res) => {
    login(req, res);
});

API_ROUTE.post('/create-user', (req, res) => {
    createUser(req, res);
});

API_ROUTE.post('/add-user-management', (req, res) => {
    addUser(req, res);
});
API_ROUTE.post('/get-user-management', (req, res) => {
    getUser(req, res);
});

export default API_ROUTE;
