import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MoviesServices } from './movies.services';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from 'src/exceptions/custom.exception';

@Controller('/api/private/movies')
@UseFilters(CustomException)
@UseGuards(AuthGuard('jwt'))
export class MoviesPrivateController {
  constructor(private readonly moviesService: MoviesServices) {}

  /**
   * This method used to create Reviews for particular movie
   * @param req This is request object from the authentication token
   * @param movie_id This is movie id
   * @param user_reviews This is user review object from the body
   * @returns Promise<string> If movie review is sucessfully created then
   */
  @Post('/:movie_id/review')
  async createReviews(
    @Req() req,
    @Param('movie_id') movie_id: string,
    @Body()
    user_reviews: {
      comment: string;
      movie_rating: number;
    },
  ): Promise<string> {
    return await this.moviesService.createReviews(
      req.user,
      movie_id,
      user_reviews,
    );
  }
}
