import {Router} from 'express';
import {authController}  from '../controllers/authController';
import { talentProfileController } from '@controllers/talents-profile-controller';
import { fileUpload } from '@utils/fileUpload';

const API_ROUTE = Router();
const auth = new authController();
const talent = new talentProfileController;
const upload = new fileUpload();
 
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
API_ROUTE.post('/file-upload', (req, res) => {
 //This is Upload Route
    upload.uploadFile(req, res);
});

export default API_ROUTE;
