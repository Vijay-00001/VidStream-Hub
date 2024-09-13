import * as UserContext from "../constants/UserConstants";
import * as UserServices from "../apis/UserServices";
import { Dispatch } from "redux"; // Import Dispatch type from Redux if needed
import { ErrorsAction, tokenProtection } from "../Protection";
import { Passwords, TypeOfDispatch, User } from "@/Types";
import toast from "react-hot-toast";

// When User Login Then Take Action
export const LoginAction = (datas: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UserContext.USER_LOGIN_REQUEST });
    const response = await UserServices.LoginUser(datas);
    dispatch({ type: UserContext.USER_LOGIN_SUCCESS, payload: response });
  } catch (error: any) {
    ErrorsAction(error, dispatch, UserContext.USER_LOGIN_FAIL);
  }
};

// When User Register Then Take Action
export const RegisterAction = (datas: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UserContext.USER_REGISTER_REQUEST });
    const response = await UserServices.RegisterUser(datas);
    dispatch({ type: UserContext.USER_REGISTER_SUCCESS, payload: response });
  } catch (error: any) {
    ErrorsAction(error, dispatch, UserContext.USER_REGISTER_FAIL);
  }
};

// When User Update Then Take Action
export const UpdateAction =
  (user: User) => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: UserContext.USER_UPDATE_PROFILE_REQUEST });
      const response = await UserServices.UpdateProfileUser(
        user,
        tokenProtection(getState)
      );
      dispatch({
        type: UserContext.USER_UPDATE_PROFILE_SUCCESS,
        payload: response,
      });
      toast.success(`Your Profile is Updated`);
      dispatch({ type: UserContext.USER_LOGIN_SUCCESS, payload: response });
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_UPDATE_PROFILE_FAIL);
    }
  };

export const ChangePasswordAction =
  (data: Passwords) => async (dispatch: Dispatch, getState: object) => {
    try {
      console.log("passwords", data);
      dispatch({ type: UserContext.USER_CHANGE_PASSWORD_REQUEST });
      await UserServices.ChangePasswordUser(data, tokenProtection(getState));
      dispatch({
        type: UserContext.USER_CHANGE_PASSWORD_SUCCESS,
      });
      toast.success(`Your Password is Changed successfully`);
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_CHANGE_PASSWORD_FAIL);
    }
  };

// When User Logout Then Take Action
export const LogoutAction = () => (dispatch: Dispatch) => {
  try {
    UserServices.LogoutUser();
    dispatch({ type: UserContext.USER_LOGOUT });
    dispatch({ type: UserContext.USER_LOGIN_RESET });
    dispatch({ type: UserContext.USER_REGISTER_RESET });
    dispatch({ type: UserContext.USER_UPDATE_PROFILE_RESET });
    dispatch({ type: UserContext.USER_CHANGE_PASSWORD_RESET });
    dispatch({ type: UserContext.USER_GET_FAVORITES_MOVIES_RESET });
    dispatch({ type: UserContext.GET_ALL_USERS_RESET });
    dispatch({ type: UserContext.USER_DELETE_ALL_FAVORITES_MOVIES_RESET });
    dispatch({ type: UserContext.USER_DELETE_RESET });
    toast.success(`Logout successfully`);
  } catch (error: any) {
    ErrorsAction(error, dispatch, UserContext.USER_LOGOUT);
  }
};

// User Get All Favorites Movies Then Take Action
export const GetFavoritesMoviesAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: UserContext.USER_GET_FAVORITES_MOVIES_REQUEST });
      const response = await UserServices.GetFavoritesMovies(
        tokenProtection(getState)
      );
      dispatch({
        type: UserContext.USER_GET_FAVORITES_MOVIES_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_GET_FAVORITES_MOVIES_FAIL);
    }
  };

// User Delete Single Favorites Movies Then Take Action
export const DeleteSingleMovieFromFavoritesAction =
  (id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_SINGLE_FAVORITES_MOVIES_REQUEST" });
      await UserServices.DeleteSingleMovieFromFavorites(
        id,
        tokenProtection(getState)
      );
      dispatch({ type: "USER_DELETE_SINGLE_FAVORITES_MOVIES_SUCCESS" });
      dispatch(GetFavoritesMoviesAction());
      toast.success(`Favorites Movie is removed successfully`);
    } catch (error: any) {
      ErrorsAction(error, dispatch, "USER_DELETE_SINGLE_FAVORITES_MOVIES_FAIL");
    }
  };

export const DeleteAllFavoritesMoviesAction =
  () => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_ALL_FAVORITES_REQUEST" });
      const response = await UserServices.DeleteAllFavoritesMovies(
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_DELETE_ALL_FAVORITES_SUCCESS",
        payload: response,
      });
      dispatch(GetFavoritesMoviesAction());
      toast.success(`All Favorites Movies is Deleted successfully`);
    } catch (error: any) {
      ErrorsAction(error, dispatch, "USER_DELETE_ALL_FAVORITES_FAIL");
    }
  };

// When User Delete Then Take Action
export const DeleteAction =
  () => async (dispatch: Dispatch | any, getState: object) => {
    try {
      dispatch({ type: UserContext.USER_DELETE_REQUEST });
      await UserServices.DeleteUserAccount(tokenProtection(getState));
      dispatch({ type: UserContext.USER_DELETE_SUCCESS });
      dispatch(LogoutAction());
      toast.success(`Your Account is Deleted successfully`);
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_DELETE_FAIL);
    }
  };

// When Admin Get The All Users Then Take Action
export const adminGetAllUsersAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: UserContext.GET_ALL_USERS_REQUEST });
      const response = await UserServices.adminGetAllUsers(
        tokenProtection(getState)
      );
      dispatch({
        type: UserContext.GET_ALL_USERS_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.GET_ALL_USERS_FAIL);
    }
  };

// When Admin Delete The User Account Then Take Action
export const adminDeleteUserAction =
  (id: string) => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: UserContext.USER_DELETE_REQUEST });
      await UserServices.AdminDeleteUserAccount(id, tokenProtection(getState));
      dispatch({ type: UserContext.USER_DELETE_SUCCESS });
      toast.success(`User Account is Deleted successfully`);
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_DELETE_FAIL);
    }
  };

export const sendEmailAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UserContext.USER_SEND_EMAIL_REQUEST });
      await UserServices.sendEmail(email);
      dispatch({ type: UserContext.USER_SEND_EMAIL_SUCCESS });
    } catch (error: string | any) {
      ErrorsAction(error, dispatch, UserContext.USER_SEND_EMAIL_FAIL);
    }
  };

// When user forgot the password the take action
export const ForgotPasswordAction =
  (newPassword: string, email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UserContext.USER_FORGOT_PASSWORD_REQUEST });
      await UserServices.ForgotPassword(newPassword, email);
      dispatch({ type: UserContext.USER_FORGOT_PASSWORD_SUCCESS });
      toast.success("Password reset login with new password");
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_FORGOT_PASSWORD_FAIL);
    }
  };

// When user Subscrib any subscription then
export const UserGetSubscriptionAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: UserContext.USER_GET_SUBSCRIPTION_REQUEST });
      const response = await UserServices.UserGetSubscription(
        tokenProtection(getState)
      );
      dispatch({
        type: UserContext.USER_GET_SUBSCRIPTION_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      ErrorsAction(error, dispatch, UserContext.USER_GET_SUBSCRIPTION_FAIL);
    }
  };
