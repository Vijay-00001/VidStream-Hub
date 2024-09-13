import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  adminDeleteUserReducer,
  adminGetAllUsersReducer,
  userChangePasswordReducer,
  userDeleteAllFavoritesMoviesReducer,
  userDeleteFavoritesMovieReducer,
  userDeleteReducer,
  userFavoritesMoviesReducer,
  userForgotPasswordReducer,
  userGetSubscriptionReducer,
  userLoginReducer,
  userRegisterReducer,
  userSendEmailReducer,
  userUpdateProfileReducer,
} from "./reducers/UserReducers";
import {
  addCategoryReducer,
  deleteCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
} from "./reducers/CategoryReducers";
import {
  GetTopRatedVideosReducer,
  createMovieReducer,
  deleteAllMoviesReducer,
  deleteMovieReducer,
  getAllMoviesReducer,
  getMoviesByYearReducer,
  getRandomVideosReducer,
  getSingleVideoReducer,
  likeVideosReducer,
  movieCastReducer,
  sendReviewReducer,
  updateMovieReducer,
} from "./reducers/MoviesReducers";
import {
  addNewVideoReducer,
  deletePrivateDocumentReducer,
  deletePrivateMusicReducer,
  deletePrivatePhotoReducer,
  deleteVideoReducer,
  getAllDocumentReducer,
  getAllMusicReducer,
  getAllPhotoReducer,
  getAllPrivateDocumentReducer,
  getAllPrivateMusicReducer,
  getAllPrivatePhotoReducer,
  getAllVideoReducer,
  getVideoByIdReducer,
  updateVideoReducer,
  usePrivateVideosReducer,
} from "./reducers/VideosReducers";
import { User } from "@/Types";

// Define a function to safely access localStorage
function getLocalStorageItem(key: string): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

// Get user info from localStorage if available
const userInfoFromStorageJSON = getLocalStorageItem("userInfo");

const userInfoFromStorage: User | null = userInfoFromStorageJSON
  ? JSON.parse(userInfoFromStorageJSON)
  : null;

const rootReducer = combineReducers({
  // User Reducer
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileUpdate: userUpdateProfileReducer,
  userChangePassword: userChangePasswordReducer,
  useSendEmail: userSendEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  userGetAllFavorites: userFavoritesMoviesReducer,
  userSubsription: userGetSubscriptionReducer,
  userDeleteFavorite: userDeleteFavoritesMovieReducer,
  userDeleteAllFavorites: userDeleteAllFavoritesMoviesReducer,
  userDeleteProfile: userDeleteReducer,
  adminGetAllUser: adminGetAllUsersReducer,
  adminDeleteUser: adminDeleteUserReducer,

  // Category Reducer
  getAllCategory: getCategoryReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,

  // Movie Reducer
  getAllMovies: getAllMoviesReducer,
  getRandomVideos: getRandomVideosReducer,
  getSingleVideo: getSingleVideoReducer,
  getTopVideos: GetTopRatedVideosReducer,
  getMoviesByYear: getMoviesByYearReducer,
  postReviewVideo: sendReviewReducer,
  postFavoriteMovies: likeVideosReducer,
  deleteSingleMovie: deleteMovieReducer,
  deleteAllMovies: deleteAllMoviesReducer,
  createMovie: createMovieReducer,
  updateMovie: updateMovieReducer,
  createEditDeleteCast: movieCastReducer,

  //Videos Reducer
  getAllVideos: getAllVideoReducer,
  getPrivateVideos: usePrivateVideosReducer,
  getVideoById: getVideoByIdReducer,
  addVideo: addNewVideoReducer,
  updateVideo: updateVideoReducer,
  deleteVideoById: deleteVideoReducer,

  // Music Reducer
  getAllMusics: getAllMusicReducer,
  getAllPrivateMusic: getAllPrivateMusicReducer,
  deletePrivateMusic: deletePrivateMusicReducer,

  // Photo Reducer
  getAllPhotos: getAllPhotoReducer,
  getAllPrivatePhoto: getAllPrivatePhotoReducer,
  deletePrivatePhoto: deletePrivatePhotoReducer,

  // document Reducer
  getAllDocuments: getAllDocumentReducer,
  getAllPrivateDocument: getAllPrivateDocumentReducer,
  deletePrivateDocument: deletePrivateDocumentReducer,
});

// Defined the InitialState
const InitialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Define the type of RootState
export type RootState = ReturnType<typeof rootReducer>;

//INITIALIZE STORE
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: InitialState,
});
