import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './aws.service';

@Controller('/api/video')
export class VideoController {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * This method is used to get the video from aws
   * @param videoKey this is the key of the video
   * @returns it return the video
   */
  @Get('/:videoKey')
  async getVideo(@Param('videoKey') videoKey: string): Promise<Buffer> {
    const result = await this.s3Service.getVideo(videoKey);
    return result;
  }

  /**
   * This is used for the file upload from user to aws sevices.
   * @param file this file get form the users and upload to aws
   * @returns it return the url of the uploaded file
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepts file uploads
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File, // Decorator to get the uploaded file
  ): Promise<string> {
    const bucketName = process.env.AWS_BUCKET_NAME; // Fetch the AWS bucket name from environment variables
    const key = `${file.originalname}`; // Generate the key where the file will be stored in the bucket
    return this.s3Service.uploadVideo(file, bucketName, key); // Delegate the file upload to the S3 service
  }
}
