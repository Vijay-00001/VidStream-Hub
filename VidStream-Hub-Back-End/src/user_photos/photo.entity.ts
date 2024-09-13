import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PhotoDocument = Photo & Document;

@Schema({ timestamps: true })
export class Photo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: String, required: [true, 'photo_title is required'] })
  title: string;

  @Prop({ type: String, required: [true, 'photo_description is required'] })
  description: string;

  @Prop({ type: String, required: [true, 'photo_url is required'] })
  url: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
