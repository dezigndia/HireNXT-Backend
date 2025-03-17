import { users } from '@models/User';
import { Request, Response } from 'express';
export class talentProfileController {

    public constructor() {}
    public user = new users();

    public addDatails = async (req: Request, res: Response) => {
        const { role, name, company, email, contact, password, designation} = req.body;
      
        try {
          const response = await this.user.createUser(role, name, company, email, contact, password, designation);
          res.json({ "Response" : response });
        } catch (error) {
          res.status(400).json({ error: 'server was unable to process a request due to a client error' });
        }
      };
    
}