import { TypeOfCast, TypeOfMovieAction } from "@/Types";
import * as MoviesConstants from "../constants/MoviesConstants";

// Get All Movies
export const getAllMoviesReducer = (state = {}, action: TypeOfMovieAction) => {
  switch (action.type) {
    case MoviesConstants.GET_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstants.GET_ALL_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case MoviesConstants.GET_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.GET_ALL_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// Get Random Videos Reducer
export const getRandomVideosReducer = (
  state = {},
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.GET_RANDOM_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstants.GET_RANDOM_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        rendomeMovies: action.payload,
      };
    case MoviesConstants.GET_RANDOM_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.GET_RANDOM_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// Get Single Videos Reducer
export const getSingleVideoReducer = (
  state = { movie: {} },
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.GET_SINGLE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.GET_SINGLE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true, movie: action.payload };
    case MoviesConstants.GET_SINGLE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.GET_SINGLE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// Get Top rated Videos
export const GetTopRatedVideosReducer = (
  state = { movies: [] },
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.GET_TOP_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstants.GET_TOP_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true, topmovies: action.payload };
    case MoviesConstants.GET_TOP_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.GET_TOP_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// send review
export const sendReviewReducer = (state = {}, action: TypeOfMovieAction) => {
  switch (action.type) {
    case MoviesConstants.SEND_REVIEW_REQUEST:
      return { isLoading: true };
    case MoviesConstants.SEND_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true, review: action.payload };
    case MoviesConstants.SEND_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.SEND_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// like movie
export const likeVideosReducer = (state = {}, action: any) => {
  switch (action.type) {
    case MoviesConstants.LIKE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.LIKE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.LIKE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.LIKE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// get moveis by years count
export const getMoviesByYearReducer = (
  state = {},
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.GET_MOVIES_BY_YEAR_REQUEST:
      return { isLoading: true };
    case MoviesConstants.GET_MOVIES_BY_YEAR_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        moviesByYear: action.payload,
      };
    case MoviesConstants.GET_MOVIES_BY_YEAR_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.GET_MOVIES_BY_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

// delete single movie Reducer
export const deleteMovieReducer = (state = {}, action: TypeOfMovieAction) => {
  switch (action.type) {
    case MoviesConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.DELETE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

//delete all movies Reducer
export const deleteAllMoviesReducer = (
  state = {},
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.DELETE_ALL_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// Create Movie Reducer
export const createMovieReducer = (state = {}, action: TypeOfMovieAction) => {
  switch (action.type) {
    case MoviesConstants.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.CREATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// Update Movie Reducer
export const updateMovieReducer = (state = {}, action: TypeOfMovieAction) => {
  switch (action.type) {
    case MoviesConstants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// Movies Cast Reducer
export const movieCastReducer = (
  state = { casts: [] },
  action: TypeOfMovieAction
) => {
  switch (action.type) {
    case MoviesConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case MoviesConstants.EDIT_CAST:
      const updatedCasts = state.casts.map((cast: TypeOfCast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };
    case MoviesConstants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast: any) => cast.id !== action.payload),
      };
    case MoviesConstants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};
