import { AuthenticationService } from '@services';
import { Request, Response } from 'express';

export class AuthController {

  private authService = new AuthenticationService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const response = await this.authService.onLogin(email, password);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: 'server was unable to process a request due to a client error' });
    }
  }
  
}