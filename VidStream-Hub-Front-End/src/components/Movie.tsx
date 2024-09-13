"use client";
import { TypeOfCreateMovieInfo, TypeOfDispatch, TypeOfState } from "@/Types";
import { IfMovieLiked, LikeMovie } from "@/context/Functionalities";
import { DeleteSingleMovieFromFavoritesAction } from "@/redux/actions/UserActions";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Movie = ({ movie }: { movie: TypeOfCreateMovieInfo }) => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );
  const { isLoading } = useSelector(
    (state: TypeOfState) => state.userGetAllFavorites
  );

  const deleteSingleMovieHandler = (id: string) => {
    dispatch(DeleteSingleMovieFromFavoritesAction(id));
  };

  const isLiked = IfMovieLiked(movie?._id);

  return (
    <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
      <Link href={`/movies/single-movie-info/${movie?._id}`} className="w-full">
        <Image
          src={
            movie?.movie_thumbnail_image
              ? movie.movie_thumbnail_image
              : "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?cs=srgb&dl=pexels-vlad-che%C8%9Ban-1595655.jpg&fm=jpg"
          }
          alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
          height={500}
          width={500}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
        <h3 className="font-semibold truncate">
          {movie?.movie_title ? movie.movie_title : "No Name"}
        </h3>
        <button
          onClick={() => {
            isLiked
              ? deleteSingleMovieHandler(movie?._id)
              : LikeMovie(movie?._id, dispatch, userInfo);
          }}
          disabled={isLoading}
          className={`${
            isLiked ? "bg-transparent text-subMain" : "bg-subMain text-white"
          } aspect-square h-9 w-9 text-sm flex-colo transparent hover:bg-transparent hover:cursor-pointer border-2 border-subMain rounded-md`}
        >
          <FaHeart className={isLiked ? "text-subMain" : "text-white"} />
        </button>
      </div>
    </div>
  );
};

export default Movie;
