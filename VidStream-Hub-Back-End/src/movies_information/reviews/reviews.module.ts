import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reviews, reviewsSchema } from './reviews.entity';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reviews.name, schema: reviewsSchema }]),
  ],
  controllers: [],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
