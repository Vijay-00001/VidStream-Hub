"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import { getAllCategoryAction } from "@/redux/actions/CategoryActions";
import { getAllMoviesAction } from "@/redux/actions/MovieActions";
import { GetFavoritesMoviesAction } from "@/redux/actions/UserActions";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ToastContainer() {
  const dispatch = useDispatch<TypeOfDispatch>();
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  const { isError, isSuccess } = useSelector(
    (state: TypeOfState) => state.postFavoriteMovies
  );

  const { isError: categoryError } = useSelector(
    (state: TypeOfState) => state.getAllCategory
  );

  // This is used to get the all categories for search movies and content it not used for the ToastContainer
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    dispatch(getAllCategoryAction());
    if (userInfo && userInfo.token) {
      dispatch(GetFavoritesMoviesAction());
    }
    if (isError || categoryError) {
      toast.error(isError || categoryError);
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, isSuccess, categoryError]);

  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
