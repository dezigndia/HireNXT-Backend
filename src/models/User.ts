import { Device, UserRole } from "core/enum-types";
import { query } from '../config/database';

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob: string;
    role: UserRole;
}

export interface IPayload {
    userId: number;
    role: UserRole;
    device: Device;
    email: string;
    phone: string;
}


export const findUserByUsername = async (email: string) => {
  const result = await query('SELECT * FROM auth.users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (roles: string, name: string, companyName: string, email: string, contactNo: string, password: string) => {
  const result = await query(
    'INSERT INTO auth.users (roles, name, companyname, emails, contact, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username',
    [roles, name, companyName, email, contactNo, password]
  );
  return result.rows[0];
};

export const getUserManagementDetails = async () => {
  const result = await query('SELECT * FROM auth.users');
  return result.rows[0];
};
