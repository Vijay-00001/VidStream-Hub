import { Module, forwardRef } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoServices } from './video.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Videos, videosSchema } from './video.entity';
import { UserModule } from 'src/user_information/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Videos.name, schema: videosSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [VideoController],
  providers: [VideoServices],
  exports: [VideoServices],
})
export class VideoModule {}
