"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { Empty } from "@/components/notifications/Empty";
import Loader from "@/components/notifications/Loader";
import { SidebarContext } from "@/context/DrawerContext";
import { DownloadVideo } from "@/context/Functionalities";
import {
  DeleteAllFavoritesMoviesAction,
  DeleteSingleMovieFromFavoritesAction,
  GetFavoritesMoviesAction,
} from "@/redux/actions/UserActions";
import FileSaver from "file-saver";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const FavoritesMovies = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  // Get All Liked Movies from the Redux store
  const { isLoading, isError, likedMovies } = useSelector(
    (state: TypeOfState) => state.userGetAllFavorites
  );

  // Get User Info from the Redux store
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  // Get Delete Movie Response from the Redux store
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useSelector((state: TypeOfState) => {
    return state.userDeleteFavorite;
  });

  // Get Delete All Movies Response from the Redux store
  const {
    isLoading: deleteAllLoading,
    isError: deleteAllError,
    isSuccess,
  } = useSelector((state: TypeOfState) => {
    return state.userDeleteAllFavorites;
  });

  // Delete Movies handeler
  const deleteMoviesHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteAllFavoritesMoviesAction());
        Swal.fire("Deleted!", "All movies have been deleted.", "success");
      }
    });
  };

  // Delete Single Movie handler
  const deleteSingleMovieHandler = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteSingleMovieFromFavoritesAction(id));
        Swal.fire("Deleted!", "The movie has been deleted.", "success");
      }
    });
  };

  // Downloade Video
  const downloadVideo = async (videoUrl: string, name: string) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // UseEffect use when any of the states change then render
  useEffect(() => {
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? deleteAllError
            ? "USER_GET_FAVORITES_MOVIES_RESET"
            : "USER_GET_FAVORITES_MOVIES_RESET"
          : "USER_DELETE_ALL_FAVORITES_MOVIES_RESET",
      });
      if (isSuccess) {
        dispatch({ type: "USER_GET_FAVORITES_MOVIES_RESET" });
      }
    }
    if (userInfo || userInfo?.token) {
      dispatch(GetFavoritesMoviesAction());
    }
  }, [
    dispatch,
    isError,
    deleteError,
    deleteAllError,
    deleteSuccess,
    isSuccess,
    userInfo,
  ]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main border border-subMain font-medium transitions hover:bg-subMain text-white py-[10px] px-6 rounded"
            >
              {deleteLoading || deleteAllLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            onDeleteHandeler={deleteSingleMovieHandler}
            downloadVideo={downloadVideo}
            progress={progress}
          />
        ) : (
          <Empty message="You haven't liked any movie" />
        )}
      </div>
    </Sidebar>
  );
};

export default FavoritesMovies;
