import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { MoviesServices } from './movies.services';
import { CustomException } from 'src/exceptions/custom.exception';
import { TypeOfMovies, TypeOfQuery, TypeOfReturnQuery } from 'type';

@Controller('/api/movies')
@UseFilters(CustomException)
export class MoviesPublicController {
  constructor(private readonly moviesService: MoviesServices) {}

  /**
   * This URL is used to get all movies
   * @returns Promise<TypeOfMovies[]> This is an array of movies
   */
  @Get('/random')
  async getAllMovies(): Promise<TypeOfMovies[]> {
    return await this.moviesService.getAllMovies();
  }

  /**
   * This URL is used to get top movies
   * @returns Promise<TypeOfMovies[]> This is an array of top rated movies
   */
  @Get('/sorted/top')
  async getTopMovies(): Promise<TypeOfMovies[]> {
    return await this.moviesService.getTopMovies();
  }

  /**
   * This URL is used to get single movie
   * @param movie_id This is movie id take as parameter to find movie
   * @returns Promise<TypeOfMovies> This is an single movie to finding on to the database
   */
  @Get('/:id')
  async getMovieById(@Param('id') movie_id: string): Promise<TypeOfMovies> {
    return await this.moviesService.getMovieById(movie_id);
  }

  /**
   * This URL is used to search movie from the database
   * @param query This is query object in different movie field to find movie base on the parameters
   * @returns Promise<TypeOfReturnQuery> This is an array of movies based on query to finding on to the database
   */
  @Get('/selected/movies')
  async serchMovieByQuery(
    @Query() query: TypeOfQuery,
  ): Promise<TypeOfReturnQuery> {
    return await this.moviesService.searchMovie(query);
  }
}
