"use client";
import { useState } from "react";
import Titles from "../Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Stars from "../Stars";
import Loader from "../notifications/Loader";
import { Empty } from "../notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "@/context/Functionalities";
import {
  TypeOfCreateMovieInfo,
  TypeOfDispatch,
  TypeOfState,
  TypeOfTopSwippere,
} from "@/Types";
import Image from "next/image";

const TopSwippere = ({ nextEl, prevEl, movies }: TypeOfTopSwippere) => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  const isLiked = (movieId: string) => IfMovieLiked(movieId);

  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie: any, index: number) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate  hovered border border-border bg-dry rounded-lg overflow-hidden">
            <Image
              src={
                movie?.movie_thumbnail_image
                  ? movie.movie_thumbnail_image
                  : "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
              height={500}
              width={500}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => {
                  LikeMovie(movie?._id, dispatch, userInfo);
                }}
                disabled={isLiked(movie?._id)}
                className={`${
                  isLiked(movie?._id)
                    ? "border border-subMain text-subMain"
                    : "bg-white text-main"
                } w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white text-main`}
              >
                {/* bg-opacity-30  */}
                <FaHeart
                  className={isLiked(movie?._id) ? "text-subMain" : "text-main"}
                />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2 overflow-hidden"
                href={`/movies/single-movie-info/${movie?._id}`}
              >
                {movie?.movie_title ? movie.movie_title : "Movie Name"}
              </Link>
              <div className="flex gap-2 text-star">
                <Stars value={movie?.movie_rating ? movie.movie_rating : 0} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const TopRated = ({
  movies,
  isLoading,
}: {
  movies: TypeOfCreateMovieInfo[];
  isLoading: boolean;
}) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevtEl] = useState(null);

  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated Movies" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <TopSwippere nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <div className="mt-6">
            <Empty message="It seem's like we dont have any movies" />
          </div>
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node: any) => setPrevtEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node: any) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
