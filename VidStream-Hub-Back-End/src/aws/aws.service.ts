import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    // Initialize AWS S3 client with credentials and region configuration
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  /**
   * This method is used to fetch a video from an S3 bucket
   * @param videoKey key of the video take form the user body
   * @returns Promise<Buffer> - A promise resolving to the video content
   */
  async getVideo(videoKey: string): Promise<Buffer> {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: videoKey,
      };

      const data = await this.s3.getObject(params).promise();
      return data.Body as Buffer;
    } catch (error) {
      console.error('Error fetching video from AWS S3:', error);
      throw error;
    }
  }

  /**
   * This method is used to upload a video to an S3 bucket
   * @param file get the file from the user
   * @param bucketName this is name of the bucket is created on the AWS
   * @param key this is name of the file
   * @returns Promise<string> - A promise resolving to the URL of the uploaded file
   */
  async uploadVideo(
    file: Express.Multer.File, // Uploaded file object
    bucketName: string, // Name of the S3 bucket
    key: string, // Key/path under which the file will be stored in the bucket
  ): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer, // File content
    };

    // Upload the file to S3 and wait for the operation to complete
    const result = await this.s3.upload(params).promise();

    // Return the URL of the uploaded file
    return result.Location;
  }
}
