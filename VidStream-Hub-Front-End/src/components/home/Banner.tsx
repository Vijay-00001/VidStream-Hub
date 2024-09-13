"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import FlexMovieItems from "../FlexMovieItems";
import Loader from "../notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "@/context/Functionalities";
import { TypeOfCreateMovieInfo, TypeOfDispatch, TypeOfState } from "@/Types";
import { useCallback } from "react";
import Image from "next/image";

const Swipper = ({
  sameClass,
  movies,
}: {
  sameClass: string;
  movies: TypeOfCreateMovieInfo[];
}) => {
  const dispatch = useDispatch<TypeOfDispatch>();

  // Get the user info from the redux store
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  const isLiked = useCallback((movieId: string) => {
    return IfMovieLiked(movieId);
  }, []);

  return (
    <Swiper
      direction="vertical"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      className={sameClass}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {movies?.slice(0, 6).map((movie: any, index: number) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidden">
          <Image
            src={movie?.movie_image ? movie.movie_image : ""}
            alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
          <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
              {movie?.movie_title ? movie.movie_title : "Movie Name"}
            </h1>
            <div className="flex gap-5 items-center text-dryGray">
              <FlexMovieItems movie={movie} />
            </div>
            <div className="flex gap-5 items-center">
              <Link
                href={`/movies/single-movie-info/${movie?._id}`}
                className="bg-subMain hover:text-main transition text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
              >
                View More
              </Link>
              <button
                onClick={() => LikeMovie(movie?._id, dispatch, userInfo)}
                className={`${
                  isLiked(movie?._id) ? "bg-white text-subMain" : ""
                } bg-white hover:text-subMain transitions text-white px-6 py-3 rounded text-sm bg-opacity-30 transitions`}
              >
                <FaHeart
                  className={`${isLiked(movie?._id) ? "text-subMain" : ""} `}
                />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Banner = ({
  movies,
  isLoading,
}: {
  movies: TypeOfCreateMovieInfo[];
  isLoading: boolean;
}) => {
  const sameClass = "w-full flex-colo h-48 xl:h-96 lg:h-64 bg-dry ";
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="relative w-full">
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swipper sameClass={sameClass} movies={movies} />
      ) : (
        <div className={sameClass}>
          <div className="flex-colo mb-4 w-24 p-5 aspect-square bg-dry text-subMain text-4xl rounded-full">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            It seem&apos;s like we dont have any videos
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
