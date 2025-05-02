import { users } from '@models/User';
import { Request, Response } from 'express';
import { fileUpload } from '@utils/fileUpload';
import { databaseUtil } from '@utils/database.util';

export class talentProfileController {

    public constructor() {}
    public user = new users();
    public upload = new fileUpload();
    public databaseUtil = new databaseUtil();

    public addDatails = async (req: Request, res: Response) => {
        const { name, role, skills, experienceMonths, rate, experienceYears, notice, organization, location} = JSON.parse(req.body.data);
        this.upload.uploadFile(req, res);
        try {
          const response = await this.databaseUtil.addTalentProfile(name, role, skills, experienceMonths, rate, experienceYears, notice, organization, location);
          res.json({ "Response" : response });
        } catch (error) {
          res.status(400).json({ error: 'server was unable to process a request due to a client error' });
        }
      };
    
}