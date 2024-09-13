import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user_information/user.module';
import { Photo, PhotoSchema } from './photo.entity';
import { PhotoController } from './photo.contorller';
import { PhotoService } from './photo.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
