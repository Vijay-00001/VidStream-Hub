import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: [true, 'Title is required'] })
  title: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
