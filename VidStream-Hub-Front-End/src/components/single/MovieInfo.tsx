import { FaPlay, FaShareAlt } from "react-icons/fa";
import FlexMovieItems from "../FlexMovieItems";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import Stars from "../Stars";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UserGetSubscriptionAction } from "@/redux/actions/UserActions";
import { useRouter } from "next/navigation";
import { TypeOfDispatch, TypeOfMovieInfoComponent, TypeOfState } from "@/Types";
import Image from "next/image";

const MovieInfo = ({
  movie,
  setModalOpen,
  downloadVideo,
  progress,
}: TypeOfMovieInfoComponent) => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const router = useRouter();
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);
  const { subscription } = useSelector(
    (state: TypeOfState) => state.userSubsription
  );

  useEffect(() => {
    if (userInfo && userInfo.token) {
      // get subscription info
      dispatch(UserGetSubscriptionAction());
    }
  }, [dispatch, userInfo]);
  return (
    <div className="w-full xl:h-screen relative text-white">
      <Image
        src={
          movie?.movie_image ? movie.movie_image : "/default-movie-image.jpg"
        }
        alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
        height={500}
        width={500}
        className="w-full h-full hidden xl:inline-block object-fill"
      />
      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-80 xl:absolute top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto px-3 2xl:px-32 xl:grid xl:grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <Image
              src={
                movie?.movie_thumbnail_image
                  ? movie.movie_thumbnail_image
                  : "/default-movie-image.jpg"
              }
              alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
              height={500}
              width={500}
              className="w-full h-full object-fill"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}
              <h1 className="xl:text-4xl capitalize text-2xl font-sans font-bold">
                {movie?.movie_title ? movie.movie_title : "Movie Name"}
              </h1>
              {/* Flex items */}
              <div className="flex items-center gap-4 text-dryGray font-medium">
                <div className="flex-colo bg-subMain text-xs px-2 py-1 rounded-md font-bold">
                  HD 4K
                </div>
                <FlexMovieItems movie={movie} />
              </div>
              {/* Description */}
              <p className="text-text text-sm leading-7">
                {movie?.movie_description ? movie.movie_description : "N/A"}
              </p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* Share */}
                <div className="col-span-1 flex-colo border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20 hover:bg-subMain transitions"
                  >
                    <FaShareAlt />
                  </button>
                </div>
                {/* Language */}
                <div className="col-span-2 flex-colo font-medium text-sm">
                  <p>
                    Language:
                    <span className="ml-2 truncate text-ellipsis">
                      {movie?.movie_language ? movie.movie_language : "N/A"}
                    </span>
                  </p>
                </div>
                {/* Watch Button */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    href={`/movies/watch-movie/${movie?._id}`}
                    className="bg-dry  border-2 border-subMain transitions rounded-full flex-rows gap-4 w-full py-4 sm:p-3 hover:bg-subMain"
                  >
                    <FaPlay className="w-3 h-3 aspect-square" />
                    Watch Now
                  </Link>
                </div>
              </div>
              {/* Rating */}
              <div className="flex mb-6 text-lg gap-2 text-star">
                <Stars value={movie?.movie_rating ? movie.movie_rating : 0} />
              </div>
            </div>
            <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
              <button
                disabled={progress}
                onClick={() =>
                  userInfo?.isAdmin
                    ? downloadVideo(movie?.movie_video_url, movie?.movie_title)
                    : userInfo?.token
                    ? subscription.planType === "Standard" || "Premium"
                      ? downloadVideo(
                          movie?.movie_video_url,
                          movie?.movie_title
                        )
                      : router.push("/dashboard/subscription")
                    : router.push("/auth/login")
                }
                className="md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transition md:h-64 h-20 rounded font-medium"
              >
                <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90 ">
                  Download <FiLogIn className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
