import { selectQuery, query } from '../config/database';

export class databaseUtil {
    public getDropDownValues = async () => {
        const result = await selectQuery('select value from config.drop_down_values where key');
        return result;
    }
    public addTalentProfile = async (userId : string, name: string, role: string, email: string, contact: string, skills: string, experienceMonths: string, rate: string, experienceYears: string, notice: string, organization: string, location: string, Aadhar: string, resume: string, pan: string, degree: string) => {
        const result = await query(
            'INSERT INTO talent.talent_profile (user_id, name, role, email, contact, skills, experienceMonths, rate, experienceYears, notice, organization, location, Aadhar, resume, pan, degree, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, now())',
      [userId, name, role, email, contact, skills, experienceMonths, rate, experienceYears, notice, organization, location, Aadhar, resume, pan, degree]
        );
        return result;
    }
    public getTalentProfileDetails = async () => {
        try{
          const result = await selectQuery('name, email, contact,organization, concact(experienceYears, \'Years\', experienceMonths,\'Months\'), rate, created_on, Aadhar, resume, pan, degree from talent.talent_profile');
          return result;
      } catch(err){
        throw err;
      }
      };

}