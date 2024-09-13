import { Module } from '@nestjs/common';
import { S3Service } from './aws.service';
import { VideoController } from './aws.controller';

@Module({
  controllers: [VideoController],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
