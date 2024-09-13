import { InjectModel } from '@nestjs/mongoose';
import { Movies, MoviesDocument } from './movies.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ReviewsService } from './reviews/reviews.service';
import {
  TypeOfMovies,
  TypeOfQuery,
  TypeOfReturnQuery,
  TypeOfReviews,
  TypeOfUserReviews,
  TypeUser,
} from 'type';

@Injectable()
export class MoviesServices {
  constructor(
    @InjectModel(Movies.name)
    private readonly moviesModel: Model<MoviesDocument>,
    private readonly reviewService: ReviewsService,
  ) {}

  // ============================ PUBLIC API ============================

  /**
   * This method used to add some movies
   * @param movies This is an array of movies to be added
   * @returns Promise<TypeOfMovies[]> This is an array of movies if it's add successfully
   */
  async addSomeMovies(movies: TypeOfMovies): Promise<TypeOfMovies[]> {
    try {
      return this.moviesModel.insertMany(movies);
    } catch (error) {
      throw new BadRequestException('Movies Not Added');
    }
  }

  /**
   * This method used to get all movies from the database
   * @returns Promise<TypeOfMovies[]> This is an array of movies to finding on to the database
   */
  async getAllMovies(): Promise<TypeOfMovies[]> {
    try {
      return await this.moviesModel
        .aggregate([{ $sample: { size: 11 } }])
        .limit(11);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This is method used to get top movies
   * @returns Promise<TypeOfMovies[]> This is an array of top rated movies to finding on to the database
   */
  async getTopMovies(): Promise<TypeOfMovies[]> {
    try {
      return await this.moviesModel
        .find({})
        .sort({ movie_rating: -1 })
        .limit(11);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method used to get single movie
   * @param movie_id This is movie id take as parameter to find movie
   * @returns Promise<TypeOfMovies> This is an single movie to finding on to the database
   */
  async getMovieById(movie_id: string): Promise<TypeOfMovies> {
    try {
      return await this.moviesModel
        .findById(movie_id)
        .populate('movie_reviews');
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method used to search movie from the database
   * @param query This is query object in different movie field to find movie base on the parameters
   * @returns Promise<TypeOfReturnQuery> This is an array of movies based on query to finding on to the database
   */
  async searchMovie(query: TypeOfQuery): Promise<TypeOfReturnQuery> {
    try {
      const {
        serch,
        movie_language,
        movie_catagory,
        movie_year,
        movie_time_duration,
        movie_rating,
        page,
        user_limit,
      } = query;

      const limit = user_limit || 8;
      const skip = (Number(page) - 1) * limit;
      const findObject = {
        ...(serch && {
          movie_title: new RegExp(serch, 'i'),
        }),
        ...(movie_language && { movie_language }),
        ...(movie_catagory && { movie_catagory }),
        ...(movie_year && { movie_year }),
        ...(movie_time_duration && { movie_time_duration }),
        ...(movie_rating && { movie_rating }),
      };

      const movies = await this.moviesModel
        .find(findObject)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Get Total Number of Movies
      const count = await this.moviesModel.countDocuments(findObject);

      return {
        movies,
        page,
        pages: Math.ceil(count / limit),
        totalMovies: count,
      };
    } catch (error) {
      throw new NotFoundException('Movie Not Found');
    }
  }

  // ============================ PRIVATE API ============================

  /**
   * This mehod used to create Reviews for particular movie
   * @param user This is user object which is used to create the review and take from user authentication
   * @param movie_id This is a movie_id to which movie in create the review
   * @param user_reviews This is a user_reviews object
   * @returns Promise<String> If movie review is sucessfully created then
   */
  async createReviews(
    user: TypeUser,
    movie_id: string,
    user_reviews: TypeOfUserReviews,
  ) {
    try {
      // First We check is the user selected movie is present or not
      const movie: TypeOfMovies = await this.moviesModel
        .findById(movie_id)
        .populate('movie_reviews')
        .exec();

      // Here we find the user is already reviewed the movie or not
      const isAlreadyReviewed = movie.movie_reviews.find(
        (review: TypeOfReviews) => String(review.user_id) === user._id,
      );
      // If the user already reviewed the movie then throw the error
      if (isAlreadyReviewed) {
        throw new BadRequestException('You have already reviewed this movie');
      }

      // If the movie is present then check the user already reviewed the movie or not
      if (movie) {
        // If the user not reviewed the movie then create the review
        const create_review = await this.reviewService.createReviesOfMovie(
          user,
          movie_id,
          user_reviews,
        );
        // add the movies in the movie_review array in add the review id
        movie.movie_reviews.push(String(create_review._id));

        await this.moviesModel.updateOne({ _id: movie_id }, movie);

        const updatedMovies: TypeOfMovies = await this.moviesModel
          .findById(movie_id)
          .populate('movie_reviews')
          .exec();

        // Count the total number of reviews
        updatedMovies.movie_number_of_reviews = movie.movie_reviews.length;

        // Calculate the average rating of the movies based on the number of reviews
        const totalRating = updatedMovies.movie_reviews?.reduce(
          (sum, review: TypeOfReviews) => {
            if (review.movie_rating !== undefined) {
              sum += Number(review.movie_rating);
              return sum;
            }
            return sum;
          },
          0,
        );
        const calRating = totalRating / updatedMovies.movie_reviews.length;
        // console.log(calRating);
        updatedMovies.movie_rating = calRating;

        // update the movies
        await this.moviesModel.updateOne({ _id: movie_id }, updatedMovies);

        // send the response
        return 'Your review is added successfully.';
      } else {
        throw new NotFoundException('Movie Not Found');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // ============================ ADMIN API ============================

  /**
   * This method used to get the count of movies by year
   * @returns Promise<Record<number, number>> This method used to get the count of movies by year
   */
  async getMoviesCountByYear(): Promise<Record<number, number>> {
    const aggregation = await this.moviesModel.aggregate([
      {
        $group: {
          _id: '$movie_year',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return aggregation.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {});
  }

  /**
   * This method used to create new movie
   * @param user_id This is user object which is used to create the review and take from user authentication
   * @param movie This is a movie object comming from the body
   * @returns Promise<TypeOfMovies> If movie is created then created movie is return
   */
  async createMovie(
    user_id: String,
    movie: TypeOfMovies,
  ): Promise<TypeOfMovies> {
    try {
      const isMoviesExist = await this.moviesModel
        .findOne({
          movie_title: movie.movie_title,
        })
        .exec();
      if (isMoviesExist) {
        throw new BadRequestException('Movie Already Exist');
      }
      const createMovie = new this.moviesModel({ ...movie, user_id: user_id });
      return await createMovie.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * This method used to update movie
   * @param movie_id This is a movie_id to which movie update based on this id
   * @param data This is a data object which is comming from the body
   * @returns Promise<TypeOfMovies> If movie is updated then updated movie is return
   */
  async updateMovie(
    movie_id: string,
    data: TypeOfMovies,
  ): Promise<TypeOfMovies> {
    try {
      const isMovieExist = await this.moviesModel.findById(movie_id);
      if (!isMovieExist) {
        throw new Error('Movie Not Found');
      }
      return await this.moviesModel.findByIdAndUpdate({ _id: movie_id }, data);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method used to delete movie
   * @param id This is a movie_id to which movie delete based on this id take as parameter
   * @returns Promise<TypeOfMovies> If movie is deleted then deleted movie is return
   */
  async deleteMovieById(id: string): Promise<TypeOfMovies> {
    try {
      const isMovieExist = await this.moviesModel.findById(id);
      if (!isMovieExist) {
        throw new Error('Movie Not Found');
      }
      (isMovieExist.movie_reviews as any).map(async (review) => {
        await this.reviewService.deleteReviewById(review._id);
      });
      return await this.moviesModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * This method used to delete all movies
   * @returns Promise<string> If all movie is deleted then return string
   */
  async deleteAllMovies(): Promise<string> {
    try {
      const allMovies = await this.moviesModel.find();
      if (!allMovies.length) {
        throw new Error('No Movies Found');
      }
      const deleteAllMovies: Promise<boolean> | Promise<TypeOfMovies>[] =
        await (
          await Promise.all(allMovies as any)
        ).map(async (movie) => await this.deleteMovieById(movie));
      if (deleteAllMovies.length) throw new Error('No Movies Deleted.');
      return 'All Movies Deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
