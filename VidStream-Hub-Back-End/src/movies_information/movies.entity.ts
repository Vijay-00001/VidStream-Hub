import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MoviesDocument = Movies & Document;

@Schema()
export class Cast {
  // id of the cast member (required)
  @Prop({ type: Number, required: [true, 'Id is required'] })
  id: number;

  // Name of the cast member (required)
  @Prop({ type: String, required: [true, 'Name is required'] })
  name: string;

  // URL for the image of the cast member (required)
  @Prop({ type: String, required: [true, 'Image is required'] })
  image: string;
}

@Schema({ timestamps: true }) // Enables timestamps for createdAt and updatedAt fields
export class Movies {
  // References the User model using ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  // Title of the movie (required)
  @Prop({ type: String, required: [true, 'movie_title is required'] })
  movie_title: string;

  // Description of the movie (required)
  @Prop({ type: String, required: [true, 'movie_description is required'] })
  movie_description: string;

  // URL for the thumbnail image of the movie (required)
  @Prop({ type: String, required: [true, 'movie_thumbnail_image is required'] })
  movie_thumbnail_image: string;

  // URL for the main image of the movie (required)
  @Prop({ type: String, required: [true, 'movie_image is required'] })
  movie_image: string;

  // Category of the movie (required)
  @Prop({ type: String, required: [true, 'Catagory is required'] })
  movie_catagory: string;

  // Language of the movie (required)
  @Prop({ type: String, required: [true, 'movie_language is required'] })
  movie_language: string;

  // Year of release of the movie (required)
  @Prop({ type: Number, required: [true, 'movie_year is required'] })
  movie_year: number;

  // Duration of the movie in minutes (required)
  @Prop({ type: String, required: [true, 'movie_time_duration is required'] })
  movie_time_duration: string;

  // URL for the video of the movie (required)
  @Prop({ type: String })
  movie_video_url: string;

  // Array of cast members for the movie
  @Prop({ type: [Cast], default: [] })
  movie_casts: Cast[];

  // Array of reviews for the movie
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }])
  movie_reviews: string[];

  // Number of reviews for the movie (default: 0)
  @Prop({ type: Number, default: 0 })
  movie_number_of_reviews: number;

  // Average rating of the movie (default: 0)
  @Prop({ type: Number, default: 0 })
  movie_rating: number;
}

export const moviesSchema = SchemaFactory.createForClass(Movies);
