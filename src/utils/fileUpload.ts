import { Request, Response } from 'express';
//import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';


dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// const storage = multer.memoryStorage(); // Use memoryStorage to keep the file in memory
// const upload = multer({ storage });
interface fileKeys {
  Aadhar?: string;
  degree?: string;
  resume?: string;
  pan?: string;
}

export class fileUpload {

public constructor() {}
public jsonData: fileKeys = {};

public uploadFile = async (req: Request, res: Response, userId: string) => {

  type UploadedFiles = {
    [fieldname: string]: Express.Multer.File[];
  };
  try {
    if (!req.files) {
      JSON.stringify({'error' : 'No file uploaded'});
    }

    const files = req.files as UploadedFiles;
    for (const key in files) {
      const file = files[key][0];
      
      const directory = userId+"/"+file.originalname; 

      const uploadParams: AWS.S3.PutObjectRequest = {
        Bucket: process.env.S3_BUCKET!,
        Key: `${directory}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
  
    try {
      // Upload the file to S3
      const data = await s3.upload(uploadParams).promise();
      if(key === 'Aadhar')
        this.jsonData.Aadhar = data.Location;
      if(key === 'degree')
        this.jsonData.degree = data.Location;
      if(key === 'resume')
        this.jsonData.resume = data.Location;
      if(key === 'pan')
        this.jsonData.pan = data.Location;

    } catch (error) {
      console.error('Error uploading to S3:', error);
      JSON.stringify({'error' : error});
    }
  }
  } catch (error) {
    res.json(error);
    JSON.stringify({'error' : error});
  }

  return JSON.stringify(this.jsonData);
};

}
