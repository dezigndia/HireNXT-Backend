import { Request, Response } from 'express';
import { fileUpload } from '@utils/fileUpload';
import { databaseUtil } from '@utils/database.util';
import { query } from 'config/database';


export class jobrequirementsController {

    public constructor() {}
    public upload = new fileUpload();
    public databaseUtil = new databaseUtil();

    public addDatails = async (req: Request, res: Response) => {
      try{
        const body = req.body;
        const values = [
          body.role,
          body.minExp,
          body.maxExp,
          JSON.stringify(body.primarySkills),
          JSON.stringify(body.secondarySkills),
          body.budget.toString(),
          body.location,
          body.engagementMonths.toString(),
          body.engagementType,
          body.requirementCount.toString(),
          body.startDate,
          body.expectations,
          body.communication,
          body.workingHours.toString(),
          JSON.stringify(body.availability),
          body.travel,
          body.tools,
          body.device,
          body.responsibilities,
          body.experienceRange
        ];

        const sql = `
        INSERT INTO job.job_requests (
          role, min_exp, max_exp, primary_skills, secondary_skills,
          budget, location, engagement_months, engagement_type,
          requirement_count, start_date, expectations, communication,
          working_hours, availability, travel, tools, device,
          responsibilities, experience_range
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12, $13,
          $14, $15, $16, $17, $18,
          $19, $20
        )`;
        await query(sql, values);
        } catch (error) {
          res.status(400).json({ error: 'server was unable to process a request due to a client errorsa' });
        }
      };

      public getData = async (req: Request, res: Response) => {
        try {
          const response = await this.databaseUtil.getJobRequirementsDetails();
          return res.json({ "Response" : response.rows });
        } catch (err) {
          return res.status(400).json({ error: 'server was unable to process request due to a client ' + err });
        }
      };
    
}