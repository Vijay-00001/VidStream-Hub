import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose'; // Import Document type
import validator from 'validator'; // Import validator module for validating some fields

// Define the types for user entity and document
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: [true, 'Name is required'] })
  fullName: string;

  @Prop({
    type: String,
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: [true, 'Email already exists'],
  })
  email: string;

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }])
  likedMovies: string[]; // Array of movie IDs

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    default: null,
  })
  subscriptions: string; // Subscription ID

  @Prop({ type: Boolean, default: false })
  isDelete: boolean;

  @Prop({ type: String })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
