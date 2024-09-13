import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, moviesSchema } from './movies.entity';
import { MoviesServices } from './movies.services';
import { UserModule } from 'src/user_information/user.module'; // Importing the UserModule
import { ReviewsModule } from './reviews/reviews.module';
import { MoviesAdminController } from './movies.admin.controller';
import { MoviesPrivateController } from './movies.private.controller';
import { MoviesPublicController } from './movies.public.controller';

@Module({
  imports: [
    // Importing the MongooseModule and registering the Movies model with its schema
    MongooseModule.forFeature([{ name: Movies.name, schema: moviesSchema }]),
    // Importing other modules needed by the MoviesModule
    forwardRef(() => ReviewsModule),
    forwardRef(() => UserModule), // Forward referencing the UserModule
  ],
  controllers: [
    MoviesAdminController,
    MoviesPrivateController,
    MoviesPublicController,
  ],
  providers: [MoviesServices], // Providing the MoviesServices
  exports: [MoviesServices], // Exporting the MoviesServices
})
export class MoviesModule {}
