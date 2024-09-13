import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  // This session id when user Start the payment
  @Prop({ type: String })
  session_id: string;

  // plan id it is a subscription id
  @Prop({ type: String, default: null })
  planId: string;

  // palan start data if user payment successfully then take current date
  @Prop({ type: String, default: null })
  planStartDate: string;

  // palan end data if user payment successfully then when plan end it date
  @Prop({ type: String, default: null })
  planEndDate: string;

  // palan amount based on plan
  @Prop({ type: Number, default: 0 })
  planAmount: number;

  // palan status if user paid or unpaid
  @Prop({ type: String, default: 'unpaid' })
  planStatus: string;

  // plan id which type of plan user selected
  @Prop({ type: String, default: null })
  planType: string;

  // which user is subscribed
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
