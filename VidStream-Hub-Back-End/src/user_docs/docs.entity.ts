import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type DocsDocument = Docs & Document;

@Schema({ timestamps: true })
export class Docs {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: String, required: [true, 'docs_title is required'] })
  title: string;

  @Prop({ type: String, required: [true, 'docs_description is required'] })
  description: string;

  @Prop({ type: String, required: [true, 'docs_docs_url is required'] })
  url: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;
}

export const docsSchema = SchemaFactory.createForClass(Docs);
