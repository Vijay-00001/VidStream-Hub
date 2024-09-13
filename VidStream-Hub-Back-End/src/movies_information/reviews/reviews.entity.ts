import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ReviewsDocument = Reviews & Document;

@Schema({ timestamps: true })
export class Reviews {
  // userId is the user who created the review
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  // movieId is the movie which is reviewed
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' })
  movie_id: string;

  // This user name is which user is created the review
  @Prop({ type: String, required: [true, 'user name is required'] })
  user_name: string;

  // This user image is user profile picture
  @Prop({ type: String, required: [true, 'user image is required'] })
  user_image: string;

  // This is movie rating to give user as body parameter
  @Prop({ type: Number, required: [true, 'movie rating is required'] })
  movie_rating: number;

  // This is movie comment to give user as body parameter
  @Prop({ type: String, required: [true, 'comment is required'] })
  comment: string;
}

export const reviewsSchema = SchemaFactory.createForClass(Reviews);
