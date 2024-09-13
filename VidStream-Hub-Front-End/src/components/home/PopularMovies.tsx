"use client";
import { BsCollectionFill } from "react-icons/bs";
import Titles from "../Titles";
import Movie from "../Movie";
import Loader from "../notifications/Loader";
import { Empty } from "../notifications/Empty";
import { TypeOfCreateMovieInfo } from "@/Types";

const PopularMovies = ({
  movies,
  isLoading,
}: {
  movies: TypeOfCreateMovieInfo[];
  isLoading: boolean;
}) => {
  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies
            ?.slice(0, 8)
            .map((movie: TypeOfCreateMovieInfo, index: number) => {
              return <Movie key={index} movie={movie} />;
            })}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seem's like there's no movies" />
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
