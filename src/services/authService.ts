import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser} from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const loginUser = async (name: string, password: string) => {
  const user = await findUserByUsername(name);
  if (!user) {
    throw new Error('user with this email not found');
  }
  // Compare the password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  // Create JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return { token };
};

export const create = async (roles: string, name: string, company: string, email: string, contactNo: string, password: string) => {
  try{
  const hashedPassword = await bcrypt.hash(password, 10);
  if(company === undefined)
    company = "Dezigndia Technologies Pvt Ltd";
  const response = await createUser(roles, name, company, email, contactNo, hashedPassword);
  return response;
  }catch (error) {
    return error;
  }
};
