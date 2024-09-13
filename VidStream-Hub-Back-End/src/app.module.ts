import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './user_information/user.module';
import { MoviesModule } from './movies_information/movies.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { S3Module } from './aws/aws.module';
import { VideoModule } from './user_videos/video.module';
import { DocsModule } from './user_docs/docs.module';
import { PhotoModule } from './user_photos/photo.module';
import { MusicModule } from './user_musics/music.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_URL'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    CategoryModule,
    VideoModule,
    MusicModule,
    PhotoModule,
    DocsModule,
    CloudinaryModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
