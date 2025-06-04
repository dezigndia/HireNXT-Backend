import { Request, Response } from 'express';
import { fileUpload } from '@utils/fileUpload';
import { databaseUtil } from '@utils/database.util';



export class talentProfileController {

    public constructor() {}
    public upload = new fileUpload();
    public databaseUtil = new databaseUtil();

    public addDatails = async (req: Request, res: Response) => {
      try{
        const { name, role, email, contact, skills, experienceMonths, rate, experienceYears, notice, organization, location} = JSON.parse(req.body.data);
        const userId = name+"_"+Date.now();
        const fileNames = await this.upload.uploadFile(req, res, userId);
        const { Aadhar,resume,pan,degree} = JSON.parse(fileNames.toString());
        
          const response = await this.databaseUtil.addTalentProfile(userId, name, role, email, contact, skills, experienceMonths, rate, experienceYears, notice, organization, location, Aadhar, resume, pan, degree);
          res.json({ "Response" : response });
        } catch (error) {
          res.status(400).json({ error: 'server was unable to process a request due to a client error' });
        }
      };

      public getData = async (req: Request, res: Response) => {
        try {
          const response = await this.databaseUtil.getTalentProfileDetails();
          return res.json({ "Response" : response.rows });
        } catch (err) {
          return res.status(400).json({ error: 'server was unable to process request due to a client ' + err });
        }
      };
    
}