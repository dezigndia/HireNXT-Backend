import { Request, Response } from 'express';
import { loginUser, create } from '../services/authService';
import { getUserManagementDetails } from '../models/User';

export const login = async (req: Request, res: Response) => {
  const { email, password} = req.body;

  try {
      console.log(email+" "+password)
      const { token } = await loginUser(email, password);
      res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const response = await create('', name, '', email, '', password);
    res.json({ "Response" : response });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { role, name, company, email, contact, password } = req.body;

  try {
    const response = await create(role, name, company, email, contact, password);
    res.json({ "Response" : response });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};

export const getUser = async (req: Request, res: Response) => {

  try {
    const response = await getUserManagementDetails();
    res.json({ "Response" : response.rows });
  } catch (error) {
    res.status(400).json({ error: 'server was unable to process a request due to a client error' });
  }
};