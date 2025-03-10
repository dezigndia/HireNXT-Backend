import { Device, UserRole } from "core/enum-types";
import { query, selectQuery } from '../config/database';

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
  const result = await selectQuery('SELECT * FROM auth.users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (roles: string, name: string, company: string, email: string, contact: string, password: string) => {
  const result = await query(
    'INSERT INTO auth.users (roles, name, company, email, contact, password, designation, created_on, modified_on) VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())',
    [roles, name, company, email, contact, password, 'Sr Developer']
  );
  return result;
};

export const getUserManagementDetails = async () => {
  const result = await selectQuery('select name,email,contact,company as organization,designation,created_on as "createdOn",modified_on as "modifiedOn",roles as type from auth.users');
  return result;
};
