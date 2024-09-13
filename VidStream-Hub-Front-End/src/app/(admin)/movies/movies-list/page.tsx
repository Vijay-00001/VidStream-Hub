"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { Empty } from "@/components/notifications/Empty";
import Loader from "@/components/notifications/Loader";
import {
  deleteAllMoviesAction,
  deleteSingleMovieAction,
  getAllMoviesAction,
} from "@/redux/actions/MovieActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import * as MoviesConstants from "@/redux/constants/MoviesConstants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import MoviesList from "@/screens/dashboard/admin/MoviesList";

const ListOfMovies = () => {
  const MySwal = withReactContent(Swal);

  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain cursor-pointer hover:bg-subMain";

  const dispatch = useDispatch<TypeOfDispatch>();

  // Get Movies from redux store
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state: TypeOfState) => state.getAllMovies
  );

  // Get Delete Movie Response from redux store
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state: TypeOfState) => state.deleteSingleMovie
  );

  // Get Delete All Movies Response from redux store
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state: TypeOfState) => state.deleteAllMovies
  );

  // Delete Movies handeler
  const deleteMoviesHandler = (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSingleMovieAction(id));
      }
    });
  };

  // Delete All Movies handler
  const deleteAllMoviesHandler = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete all movies?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "No, keep them",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllMoviesAction());
      }
    });
  };

  // UseEffect use for when any state change then rerender the page
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
      dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_RESET });
      dispatch({ type: MoviesConstants.DELETE_MOVIE_RESET });
    }
  }, [dispatch, isError, deleteError, deleteAllError]);

  // Pagination Handeler
  const prevPage = () => {
    dispatch(getAllMoviesAction({ pageNumber: `${Number(page) - 1}` }));
  };

  const nextPage = () => {
    dispatch(getAllMoviesAction({ pageNumber: `${Number(page) + 1}` }));
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main border border-subMain font-medium transitions hover:bg-subMain text-white  py-[10px] px-6 rounded"
            >
              {deleteAllLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandeler={deleteMoviesHandler}
            />
            <div className=" w-full flex-rows gap-6 my-5">
              <button
                disabled={Number(page) === 1}
                onClick={prevPage}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-2xl" />
              </button>
              <button
                disabled={Number(page) === Number(pages)}
                onClick={nextPage}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-2xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You haven't liked any movie" />
        )}
      </div>
    </Sidebar>
  );
};

export default ListOfMovies;
