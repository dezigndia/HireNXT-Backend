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



export class fileUpload {

public constructor() {}

public uploadFile = async (req: Request, res: Response) => {

  type UploadedFiles = {
    [fieldname: string]: Express.Multer.File[];
  };
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const files = req.files as UploadedFiles;
    for (const key in files) {
      const file = files[key][0];
      
      const directory = 'Sripad'; 

      const uploadParams: AWS.S3.PutObjectRequest = {
        Bucket: process.env.S3_BUCKET!,
        Key: `${directory}/${key}_${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
  
    try {
      // Upload the file to S3
      const data = await s3.upload(uploadParams).promise();
      console.log(`File uploaded successfully. ${data.Location}`);
    } catch (error) {
      console.error('Error uploading to S3:', error);
      return res.status(500).json({ message: 'Error uploading file to S3.' });
    }
  }
  } catch (error) {
    res.json(error);
  }
};

}
