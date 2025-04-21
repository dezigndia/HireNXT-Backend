import {Router} from 'express';
import {authController}  from '../controllers/authController';
import { talentProfileController } from '@controllers/talents-profile-controller';
import multer from 'multer';

const API_ROUTE = Router();
const auth = new authController();
const talent = new talentProfileController;
const storage = multer.memoryStorage();
const fileUploads = multer({ storage: storage });
 
API_ROUTE.post('/login', (req, res) => {
    auth.login(req, res);
});
API_ROUTE.post('/add-user-management', (req, res) => {
    auth.addUser(req, res);
});
API_ROUTE.post('/get-user-management', (req, res) => {
    auth.getUser(req, res);
});
API_ROUTE.post('/add-talents-profiles', fileUploads.fields([{ name: 'resume' }, { name: 'Aadhar' }, { name: 'pan' }]), (req, res) => {
    talent.addDatails(req,res);
});

export default API_ROUTE;
