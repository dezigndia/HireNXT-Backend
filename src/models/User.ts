import { query, selectQuery } from '../config/database';

export class users {

  public constructor() {}

public findUserByUsername = async (email: string) => {
  try{
    const result = await selectQuery('SELECT * FROM auth.users WHERE email = $1', [email]);
    return result;
  } catch(err){
    throw err;
  }
};

public createUser = async (roles: string, name: string, company: string, email: string, contact: string, password: string, designation: string) => {
  try{
    const result = await query(
      'INSERT INTO auth.users (roles, name, company, email, contact, password, designation, created_on, modified_on) VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())',
      [roles, name, company, email, contact, password, designation]
    );
    return result;
} catch(err){
  throw err;
}
};

public getUserManagementDetails = async () => {
  try{
    const result = await selectQuery('select name,email,contact,company as organization,designation,created_on as "createdOn",modified_on as "modifiedOn",roles as type from auth.users');
    return result;
} catch(err){
  throw err;
}
};

}