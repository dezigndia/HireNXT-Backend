import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { users } from '../models/User';

export class authController {

public constructor() {}
public user = new users();
public authservice = new authService();
public login = async (req: Request, res: Response) => {
  const { email, password} = req.body;

  try {
      console.log(email+" "+password)
      const { token } = await this.authservice.loginUser(email, password);
      res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'server was unable to process a request due to a client '+ err });
  }
};

public addUser = async (req: Request, res: Response) => {
  const { role, name, company, email, contact, password, designation} = req.body;

  try {
    const response = await this.authservice.create(role, name, company, email, contact, password, designation);
    res.json({ "Response" : response });
  } catch (err) {
    res.status(400).json({ error: 'server was unable to process a request due to a client '+ err });
  }
};

public getUser = async (req: Request, res: Response) => {
  try {
    const response = await this.user.getUserManagementDetails();
    return res.json({ "Response" : response.rows });
  } catch (err) {
    return res.status(400).json({ error: 'server was unable to process a request due to a client ' + err });
  }
};

}