import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/authentication/auth.rolegaurd';
import { MoviesServices } from './movies.services';
import { TypeOfMovies } from 'type';

@Controller('/api/admin/movies') // This controller is for admin
@UseFilters(CustomException) // This will catch all the exceptions
@UseGuards(AuthGuard('jwt'), new RoleGuard()) // This guard is for admin to verify the user is admin or not if is admin then allow to access it
export class MoviesAdminController {
  constructor(private readonly moviesService: MoviesServices) {}

  /**
   * This is URL is used to get movies count by year
   * @returns Promise<getMoviesCountByYear> this is an object of movies count
   */
  @Get('/count-by-movie-year')
  async countByMovieYear(): Promise<Record<number, number>> {
    return await this.moviesService.getMoviesCountByYear();
  }

  /**
   * This URL is used to add movies
   * @param req this req from the whis user is currently logged in it info provided by auth guard
   * @param movie_info this is a movie object from the body
   * @returns Promise<string> if movie is created sucessfully then provide string
   */
  @Post('/add')
  async addMovie(@Request() req, @Body() movie_info: TypeOfMovies) {
    return await this.moviesService.createMovie(req._id, movie_info);
  }

  /**
   * This URL is used to update movie
   * @param id It's a movie id take as parameter
   * @param movie_info this is a movie object from the body
   * @returns Promise<string> if movie is updated sucessfully then provide string
   */
  @Put('/:id')
  async updateMovie(@Param('id') id, @Body() movie_info: TypeOfMovies) {
    return await this.moviesService.updateMovie(id, movie_info);
  }

  /**
   * This URL is used to delete movie
   * @param movie_id this is a movie id take as parameter to delete particular movie
   * @returns Promise<TypeOfMovies> if movie is deleted successfully
   */
  @Delete('/:id')
  async deleteMovie(@Param('id') movie_id): Promise<TypeOfMovies> {
    return await this.moviesService.deleteMovieById(movie_id);
  }

  /**
   * This URL is used to delete all movies
   * @returns Promise<string> if all movies are deleted
   */
  @Delete('/')
  async deleteAllMovies(): Promise<string> {
    return await this.moviesService.deleteAllMovies();
  }
}
