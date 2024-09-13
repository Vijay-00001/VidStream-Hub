import { Dispatch } from "redux";
import * as MovieConstants from "../constants/MoviesConstants";
import * as MovieServices from "../apis/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
import { GetFavoritesMoviesAction } from "./UserActions";
import {
  TypeOfCreateMovieInfo,
  TypeOfDispatch,
  TypeOfErrors,
  TypeOfReview,
} from "@/Types";

// Get All Movies Action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: MovieConstants.GET_ALL_MOVIES_REQUEST });
      const response = await MovieServices.GetSelectedAllMovies(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: MovieConstants.GET_ALL_MOVIES_SUCCESS,
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.GET_ALL_MOVIES_FAIL);
    }
  };

// Get random movies Actions
export const getRandomMoviesAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: MovieConstants.GET_RANDOM_MOVIES_REQUEST });
    const response = await MovieServices.GetRandomMovies();
    dispatch({
      type: MovieConstants.GET_RANDOM_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, MovieConstants.GET_RANDOM_MOVIES_FAIL);
  }
};

// Get single videos Action
export const getSingleVideosAction =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: MovieConstants.GET_SINGLE_MOVIE_REQUEST });
      const response = await MovieServices.GetIdByMovies(id);
      dispatch({
        type: MovieConstants.GET_SINGLE_MOVIE_SUCCESS,
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.GET_SINGLE_MOVIE_FAIL);
    }
  };

// Get Top rated Videos Action
export const getTopRatedVideosAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: MovieConstants.GET_TOP_MOVIES_REQUEST });
    const response = await MovieServices.GetTopRatedVideos();
    dispatch({
      type: MovieConstants.GET_TOP_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, MovieConstants.GET_TOP_MOVIES_FAIL);
  }
};

// Get Movie By Year Action
export const getMovieByYearAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: MovieConstants.GET_MOVIES_BY_YEAR_REQUEST });
      const response = await MovieServices.GetMoviesByYear(
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.GET_MOVIES_BY_YEAR_SUCCESS,
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.GET_MOVIES_BY_YEAR_FAIL);
    }
  };

// Post Video review Action
export const postVideoReviewAction =
  (id: string, review: TypeOfReview) =>
  async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.SEND_REVIEW_REQUEST });
      const response = await MovieServices.SendReviewOfVideos(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: MovieConstants.SEND_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success(`Your Review is Submitted`);
      dispatch({ type: MovieConstants.SEND_REVIEW_RESET });
      dispatch(getSingleVideosAction(id));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.SEND_REVIEW_FAIL);
    }
  };

// Add to Liked Videos Action
export const addToLikedVideosAction =
  (movie_id: string) => async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.LIKE_MOVIE_REQUEST });
      const response = await MovieServices.AddToFavoritesVideos(
        movie_id,
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.LIKE_MOVIE_SUCCESS,
        payload: response,
      });
      toast.success("Movie Added To Favorite List");
      dispatch(GetFavoritesMoviesAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.LIKE_MOVIE_FAIL);
    }
  };

// Delete Single Movie Action
export const deleteSingleMovieAction =
  (id: string) => async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.DELETE_MOVIE_REQUEST });
      const response = await MovieServices.DeleteMovie(
        id,
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.DELETE_MOVIE_SUCCESS,
        payload: response,
      });
      toast.success("Movie Deleted");
      dispatch(getAllMoviesAction({}));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.DELETE_MOVIE_FAIL);
    }
  };

// Delete All Movies Action
export const deleteAllMoviesAction =
  () => async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.DELETE_ALL_MOVIES_REQUEST });
      const response = await MovieServices.DeleteAllMovies(
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.DELETE_ALL_MOVIES_SUCCESS,
        payload: response,
      });
      toast.success("All Movies Deleted");
      dispatch(getAllMoviesAction({}));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.DELETE_ALL_MOVIES_FAIL);
    }
  };

// Create Movie Action
export const createMovieAction =
  (movie: TypeOfCreateMovieInfo) =>
  async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.CREATE_MOVIE_REQUEST });
      const response = await MovieServices.CreateMovie(
        movie,
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.CREATE_MOVIE_SUCCESS,
        payload: response,
      });
      toast.success("Movie Created Successfully");
      dispatch(removeAllCastsAction());
      dispatch(getAllMoviesAction({}));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.CREATE_MOVIE_FAIL);
    }
  };

// Update Movie Action
export const updateMovieAciton =
  (id: string, movie: TypeOfCreateMovieInfo) =>
  async (dispatch: TypeOfDispatch, getState: string) => {
    try {
      dispatch({ type: MovieConstants.UPDATE_MOVIE_REQUEST });
      const response = await MovieServices.UpdateMovie(
        id,
        movie,
        tokenProtection(getState)
      );
      dispatch({
        type: MovieConstants.UPDATE_MOVIE_SUCCESS,
        payload: response,
      });
      toast.success("Movie Updated Successfully");
      dispatch(getSingleVideosAction(id));
      dispatch(removeAllCastsAction());
      dispatch(getAllMoviesAction({}));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, MovieConstants.UPDATE_MOVIE_FAIL);
    }
  };

// *************** CASTS ***********************

// Add CASTS Action
export const addCastsAction =
  (cast: { id: number; name: string; image: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: MovieConstants.ADD_CAST, payload: cast });
    localStorage.setItem(
      "casts",
      JSON.stringify(getState().createEditDeleteCast.casts)
    );
  };

// Remove Casts Action
export const removeCastsAction =
  (id: number) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: MovieConstants.DELETE_CAST, payload: id });
    localStorage.setItem(
      "casts",
      JSON.stringify(getState().createEditDeleteCast.casts)
    );
  };

// Update Casts Action
export const updateCastsAction =
  (cast: { id: number; name: string; image: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: MovieConstants.EDIT_CAST, payload: cast });
    localStorage.setItem(
      "casts",
      JSON.stringify(getState().createEditDeleteCast.casts)
    );
  };

// Remove all Casts
export const removeAllCastsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: MovieConstants.RESET_CAST });
  localStorage.removeItem("casts");
};
