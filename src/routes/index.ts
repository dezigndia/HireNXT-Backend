import {Router} from 'express';
import {authController}  from '../controllers/authController';
import { talentProfileController } from '@controllers/talents-profile-controller';
import multer from 'multer';
import { jobrequirementsController } from '@controllers/job-requirements-controller';

const API_ROUTE = Router();
const auth = new authController();
const talent = new talentProfileController;
const requirement = new jobrequirementsController();
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
API_ROUTE.post('/add-job-requirements', (req, res) => {
    requirement.addDatails(req, res);
});
API_ROUTE.post('/get-job-requirements', (req, res) => {
    requirement.getData(req, res);
});
API_ROUTE.post('/add-talents-profiles', fileUploads.fields([{ name: 'resume' }, { name: 'Aadhar' }, { name: 'pan' }, { name: 'degree' }]), (req, res) => {
    talent.addDatails(req,res);
});
API_ROUTE.post('/get-talents-profiles', fileUploads.fields([{ name: 'resume' }, { name: 'Aadhar' }, { name: 'pan' }, { name: 'degree' }]), (req, res) => {
    talent.getData(req,res);
});

export default API_ROUTE;
