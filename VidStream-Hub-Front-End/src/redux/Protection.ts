import { Dispatch } from "redux";
import { LogoutAction } from "./actions/UserActions";
import { ErrorResponse } from "@/Types";

export const ErrorsAction = (
  error: ErrorResponse,
  dispatch: Dispatch<any>,
  action: any
) => {
  const message =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(LogoutAction());
  }
  return dispatch({ type: action, payload: message });
};

// API Token protection
export const tokenProtection = (getState: object | any) => {
  const {
    userLogin: { userInfo },
  } = getState();
  if (!userInfo?.token) {
    return null;
  } else {
    return userInfo?.token;
  }
};
