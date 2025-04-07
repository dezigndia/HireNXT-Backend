import { Request, Response } from 'express';

//dotenv.config();
export class fileUpload {

public constructor() {}

public uploadFile = async (req: Request, res: Response) => {

  try {
    res.json();
  } catch (error) {
    res.json();
  }
};

}
