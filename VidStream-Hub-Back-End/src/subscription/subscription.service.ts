import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from './subscription.entity';
import { Model } from 'mongoose';
import { TypeOfSubscription } from 'type';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  /**
   * This is method used to get all subscriptions
   * @param id Get the subscription by id as a parameter in url
   * @returns the full subscription information
   */
  async findById(id: string): Promise<TypeOfSubscription | any> {
    return await this.subscriptionModel.findById(id);
  }

  /**
   * This is method used to create new subscription
   * @param price Get the subscription by id as a parameter in url
   * @param user_id Get the subscription by id as a parameter in url
   * @param session_id Get the subscription by id as a parameter in url
   * @param planId Get the subscription by id as a parameter in url
   * @returns the full subscription information it will create a new subscription
   */
  async createSubscription(
    price: number,
    user_id: string,
    session_id: string,
    planId: string,
  ): Promise<TypeOfSubscription | any> {
    const newSubscription = new this.subscriptionModel({
      session_id,
      planAmount: price,
      userId: user_id,
      planId,
      planType: price === 1 ? 'Basic' : price === 3 ? 'Standard' : 'Premium',
    }).save();

    return newSubscription;
  }

  /**
   * This is method used to update subscription
   * @param id Get the subscription by id as a parameter in url
   * @param data Get the subscription by Data as a parameter in url
   * @returns the full subscription information it was updated subscription
   */
  async updateSubscription(
    id: string,
    data: TypeOfSubscription,
  ): Promise<TypeOfSubscription> {
    return await this.subscriptionModel.findByIdAndUpdate(id, data);
  }
}
