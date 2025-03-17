import {Router} from 'express';
import {authController}  from '../controllers/authController';
import { talentProfileController } from '@controllers/talents-profile-controller';

const API_ROUTE = Router();
const auth = new authController();
const talent = new talentProfileController;
 
API_ROUTE.post('/login', (req, res) => {
    auth.login(req, res);
});
API_ROUTE.post('/add-user-management', (req, res) => {
    auth.addUser(req, res);
});
API_ROUTE.post('/get-user-management', (req, res) => {
    auth.getUser(req, res);
});
API_ROUTE.post('/add-talents-profiles', (req, res) => {
    talent.addDatails(req, res);
});


export default API_ROUTE;
