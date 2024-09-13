import { TypeOfUserAction } from "@/Types";
import * as UserConstants from "../constants/UserConstants";

// Login
export const userLoginReducer = (state = {}, action: TypeOfUserAction) => {
  switch (action.type) {
    case UserConstants.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_LOGIN_RESET:
      return {};
    case UserConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Register
export const userRegisterReducer = (state = {}, action: TypeOfUserAction) => {
  switch (action.type) {
    case UserConstants.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// Get All User By Admin
export const adminGetAllUsersReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.GET_ALL_USERS_REQUEST:
      return { isLoading: true };
    case UserConstants.GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    case UserConstants.GET_ALL_USERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.GET_ALL_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// Delete User Account by Admin
export const adminDeleteUserReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_DELETE_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_DELETE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstants.USER_DELETE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// Update Profile
export const userUpdateProfileReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstants.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// Change Password
export const userChangePasswordReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };
    case UserConstants.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// Send Email
export const userSendEmailReducer = (state = {}, action: TypeOfUserAction) => {
  switch (action.type) {
    case UserConstants.USER_SEND_EMAIL_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_SEND_EMAIL_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstants.USER_SEND_EMAIL_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_SEND_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

// Forgot Password
export const userForgotPasswordReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_FORGOT_PASSWORD_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_FORGOT_PASSWORD_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstants.USER_FORGOT_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// Get User All Favirotes Movies
export const userFavoritesMoviesReducer = (
  state = { likedMovies: [] },
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_GET_FAVORITES_MOVIES_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_GET_FAVORITES_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true, likedMovies: action.payload };
    case UserConstants.USER_GET_FAVORITES_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_GET_FAVORITES_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// User Delete Favirotes Movie
export const userDeleteFavoritesMovieReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_DELETE_SINGLE_FAVORITES_MOVIES_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_DELETE_SINGLE_FAVORITES_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstants.USER_DELETE_SINGLE_FAVORITES_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_DELETE_SINGLE_FAVORITES_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// User Delete All Faviorites Movies
export const userDeleteAllFavoritesMoviesReducer = (
  state = {},
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_DELETE_ALL_FAVORITES_MOVIES_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_DELETE_ALL_FAVORITES_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true, likedMovies: action.payload };
    case UserConstants.USER_DELETE_ALL_FAVORITES_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_DELETE_ALL_FAVORITES_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};

// Delete User Account
export const userDeleteReducer = (state = {}, action: TypeOfUserAction) => {
  switch (action.type) {
    case UserConstants.USER_DELETE_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_DELETE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstants.USER_DELETE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// User Get Subscription
export const userGetSubscriptionReducer = (
  state = { subscription: {} },
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case UserConstants.USER_GET_SUBSCRIPTION_REQUEST:
      return { isLoading: true };
    case UserConstants.USER_GET_SUBSCRIPTION_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        subscription: action.payload,
      };
    case UserConstants.USER_GET_SUBSCRIPTION_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstants.USER_GET_SUBSCRIPTION_RESET:
      return {};
    default:
      return state;
  }
};
