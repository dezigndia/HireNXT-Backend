import { selectQuery, query } from '../config/database';

export class databaseUtil {
    public getDropDownValues = async () => {
        const result = await selectQuery('select value from config.drop_down_values where key');
        return result;
    };
    public addTalentProfile = async (name: string, role: string, skills: string, experienceMonths: string, rate: string, experienceYears: string, notice: string, organization: string, location: string) => {
        const result = await query(
            'INSERT INTO talent.talent_profile (name, role, skills, experienceMonths, rate, experienceYears, notice, organization, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [name, role, skills, experienceMonths, rate, experienceYears, notice, organization, location]
        );
        return result;
    }

}