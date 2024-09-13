"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import { Chart, Chart2 } from "@/components/Chart";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { Empty } from "@/components/notifications/Empty";
import Loader from "@/components/notifications/Loader";
import {
  deleteSingleMovieAction,
  getAllMoviesAction,
  getMovieByYearAction,
} from "@/redux/actions/MovieActions";
import { adminGetAllUsersAction } from "@/redux/actions/UserActions";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as MoviesConstants from "@/redux/constants/MoviesConstants";
import Swal from "sweetalert2";

const Admindeshboard = () => {
  const dispatch = useDispatch<TypeOfDispatch>();

  // Get All Categories from the redux store
  const {
    isLoading: catagoryLoading,
    isError: catagoryError,
    categories,
  } = useSelector((state: TypeOfState) => state.getAllCategory);

  // Get All Users from the redux store
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state: TypeOfState) => state.adminGetAllUser);

  // Get All Movie from the Redux store
  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state: TypeOfState) => state.getAllMovies
  );

  // Get Delete Movie Response from redux store
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state: TypeOfState) => state.deleteSingleMovie
  );

  const {
    isLoading: getMovieByYearLoading,
    moviesByYear,
    isError: getMovieByYearError,
  } = useSelector((state: TypeOfState) => state.getMoviesByYear);

  // Call the useEffect hook when the component is mounted and if any state change then re-render the component
  useEffect(() => {
    // Get All Users
    dispatch(adminGetAllUsersAction());

    // Get All Movies
    dispatch(getAllMoviesAction({}));

    // Get Movie By year count
    dispatch(getMovieByYearAction());

    // if any errors is occured then
    if (catagoryError || userError || isError || deleteError) {
      toast.error(isError);
      dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_RESET });
      dispatch({ type: MoviesConstants.DELETE_MOVIE_RESET });
      dispatch({ type: MoviesConstants.GET_MOVIES_BY_YEAR_RESET });
    }
  }, [
    dispatch,
    isError,
    catagoryError,
    userError,
    deleteError,
    getMovieByYearError,
  ]);

  // Delete Movies handeler
  const deleteMoviesHandler = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSingleMovieAction(id));
      }
    });
  };

  // Dashboard Data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies,
    },
    {
      bg: "bg-blue-600",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catagoryLoading ? "Loading..." : categories?.length,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length,
    },
  ];

  return (
    <Sidebar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border gird grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3 mt-3">
              <h2>{data.title}</h2>
              <p className="text-text mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl my-3 flex flex-col lg:grid lg:grid-cols-2">
        <div className="lg:col-span-1 p-4">
          <Chart users={users?.length > 0 ? users : []} />
        </div>
        <div className="lg:col-span-1 p-4">
          <Chart2 moviesByYear={moviesByYear ? moviesByYear : {}} />
        </div>
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          data={movies}
          admin={true}
          onDeleteHandeler={deleteMoviesHandler}
        />
      ) : (
        <Empty message="It seem's like there's no movies" />
      )}
      {/* <Table data={Movies} admin={true} /> */}
    </Sidebar>
  );
};

export default Admindeshboard;
