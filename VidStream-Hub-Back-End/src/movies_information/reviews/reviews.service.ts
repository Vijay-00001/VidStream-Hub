import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reviews, ReviewsDocument } from './reviews.entity';
import { TypeOfReviews, TypeOfUserReviews, TypeUser } from 'type';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name)
    private readonly reviewModel: Model<ReviewsDocument>,
  ) {}

  /**
   *  This method is used to get all reviews from the database
   * @returns Promise<TypeOfReviews[]> This is an array of reviews to finding on to the database
   */
  async getAllReview(): Promise<TypeOfReviews[]> {
    try {
      return await this.reviewModel.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method is used to get single review
   * @param id This is review id to find the review
   * @returns Promise<TypeOfReviews> This is an single review to finding on to the database
   */
  async getReviewById(id: string): Promise<TypeOfReviews> {
    try {
      return await this.reviewModel.findById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method is user to create the new review
   * @param user This user is find which user is create the review
   * @param movie_id This movie id is which movie for create review
   * @param user_review This is user review object pass as body
   * @returns Promise<any> This return currently created review
   */
  async createReviesOfMovie(
    user: TypeUser,
    movie_id: string,
    user_review: TypeOfUserReviews,
  ): Promise<any> {
    try {
      const { comment, movie_rating } = user_review;
      const newReview = new this.reviewModel({
        user_id: user._id,
        movie_id,
        user_name: user.fullName,
        user_image: user.image ? user.image : '#', // Assuming user.image is the field to be used
        movie_rating,
        comment,
      });
      const review = await newReview.save();
      return review;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * This method is used to delete review
   * @param id this is review id to remove form the database used
   * @returns Promise<TypeOfReviews> this return removed review
   */
  async deleteReviewById(id: string): Promise<TypeOfReviews> {
    try {
      return await this.reviewModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
