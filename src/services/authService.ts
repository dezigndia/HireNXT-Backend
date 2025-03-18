import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();
export class authService {

public constructor() {}
public user = new users();

public loginUser = async (name: string, password: string) => {
  try{
    const user = await this.user.findUserByUsername(name);
    if (!user) {
      throw new Error('user with this email not found');
    }
    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email }, JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return { token };
} catch(err){
  throw err;
}
};

public create = async (roles: string, name: string, company: string, email: string, contactNo: string, password: string, designation: string) => {
  try{
  const hashedPassword = await bcrypt.hash(password, 10);
  if(company === undefined)
    company = "Dezigndia Technologies Pvt Ltd";
  const response = await this.user.createUser(roles, name, company, email, contactNo, hashedPassword, designation);
  return response;
  }catch (error) {
    return error;
  }
};

}
