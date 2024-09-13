import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MusicDocument = Music & Document;

@Schema({ timestamps: true })
export class Music {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: String, required: [true, 'music_title is required'] })
  title: string;

  @Prop({ type: String, required: [true, 'music_description is required'] })
  description: string;

  @Prop({ type: String, required: [true, 'music_url is required'] })
  url: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
