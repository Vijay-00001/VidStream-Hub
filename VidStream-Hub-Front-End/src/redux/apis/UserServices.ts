import { Passwords, User } from "@/Types";
import Axios from "./Axios";

// register new user API call
export const RegisterUser = async (user: User) => {
  const { data } = await Axios.post("/user/register", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Login User API call
export const LoginUser = async (user: User) => {
  const { data } = await Axios.post("/user/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Get All User API call
export const adminGetAllUsers = async (token: string) => {
  const { data } = await Axios.get("/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Admin Delete User Account API call
export const AdminDeleteUserAccount = async (id: string, token: string) => {
  const { data } = await Axios.delete(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//Update Profile API call
export const UpdateProfileUser = async (user: User, token: string) => {
  const { data } = await Axios.put("/user/", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Change Password API call
export const ChangePasswordUser = async (
  passwords: Passwords,
  token: string
) => {
  const { data } = await Axios.put("/user/change-password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Get User Favorites Movies API call
export const GetFavoritesMovies = async (token: string) => {
  const { data } = await Axios.get("/user/likedMovies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Delete Single Movie From Favorites API call
export const DeleteSingleMovieFromFavorites = async (
  id: string,
  token: string
) => {
  const { data } = await Axios.delete(`/user/likedMovies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Delete All Faviorites Movies API call
export const DeleteAllFavoritesMovies = async (token: string) => {
  const { data } = await Axios.delete("/user/likedMovies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Logout Function Service
export const LogoutUser = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// Send Email API call
export const sendEmail = async (email: string) => {
  const { data } = await Axios.post(`/user/send/${email}`);
  console.log("Data => ", data);
  return data;
};

// Forgot Password API call
export const ForgotPassword = async (password: string, email: string) => {
  const { data } = await Axios.put(`/user/forgot-password/${email}`, {
    passwords: password,
  });
  return data;
};

// Delete User Account API call
export const DeleteUserAccount = async (token: string) => {
  const { data } = await Axios.delete("/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

// Get User Subscription API call
export const UserGetSubscription = async (token: string) => {
  const { data } = await Axios.get("/user/get-payment-information", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
