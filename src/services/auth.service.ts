import { TokenUtils } from '@utils';
import { Device } from 'core/enum-types';
import { UserRepository } from 'repositories';



export class AuthenticationService {
  private readonly userRepo = new UserRepository('users');
  private readonly tokenUtil = new TokenUtils();

  public async onLogin(email: string, password: string) {
    try {
      const user = await this.userRepo.getUser('email', email);
      if (!user) {
        throw new Error('user with this email not found');
      }
      const payload = this.tokenUtil.generatePayload(user, Device.Web);
      const token = this.tokenUtil.generateToken(payload);
      return token;
    } catch (error: any) {
        throw error;
    }
  };
}
