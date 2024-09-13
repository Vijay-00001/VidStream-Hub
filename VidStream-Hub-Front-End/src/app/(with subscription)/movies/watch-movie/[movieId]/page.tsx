"use client";
import Loader from "@/components/notifications/Loader";
import {
  DownloadVideo,
  IfMovieLiked,
  LikeMovie,
} from "@/context/Functionalities";
import { getSingleVideosAction } from "@/redux/actions/MovieActions";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import FileSaver from "file-saver";
import { SidebarContext } from "@/context/DrawerContext";
import VideoPlayer from "@/components/VideoPlayer";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Image from "next/image";

// export const progressContext: TypeOfState = createContext({});

const WatchPage = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const parameterId = useParams().movieId.toString();

  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  const sameClass = "w-full flex-colo h-48 xl:h-96 lg:h-64 bg-dry";

  // auto play or not defined state
  const [play, setPlay] = useState(false);

  const { isLoading, isError, movie } = useSelector(
    (state: TypeOfState) => state.getSingleVideo
  );

  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  const isLiked = IfMovieLiked(movie?._id);

  // Downloade Video
  const downloadVideo = async (videoUrl: string, name: string) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    // get single movie
    dispatch(getSingleVideosAction(parameterId));
  }, [dispatch, parameterId]);

  return (
    <div className="container mx-auto bg-dry py-3 sm:py-6 mb-12">
      {!isError && (
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            href={`/movies/single-movie-info/${movie?._id ? movie._id : ""}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack />
            {movie?.movie_title ? movie.movie_title : "Movie Name"}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button
              onClick={() => {
                LikeMovie(movie?._id, dispatch, userInfo);
              }}
              disabled={isLiked}
              className={`${
                isLiked ? "text-subMain" : " bg-white"
              } flex bg-white hover:text-subMain transitions bg-opacity-50 rounded text-sm px-4 py-3`}
            >
              <FaHeart />
            </button>
            <button
              disabled={progress > 0 && progress < 100}
              onClick={() =>
                downloadVideo(movie?.movie_video_url, movie?.movie_title)
              }
              className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded text-sm px-8 font-medium py-3"
            >
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>
      )}

      {/* Watch video */}
      {play ? (
        <VideoPlayer videoUrl={movie?.movie_video_url} />
      ) : (
        <div className="w-full h-screen rounded-lg relative">
          {isLoading ? (
            <div className={sameClass}>
              <Loader />
            </div>
          ) : isError ? (
            <div className={sameClass}>
              <div className="flex-colo mb-4 w-24 p-5 aspect-square bg-main text-subMain text-4xl rounded-full">
                <RiMovie2Line />
              </div>
              <p className="text-border text-sm">
                It seem&apos;s like we dont have any videos
              </p>
            </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={() => setPlay(true)}
                  className="bg-white text-subMain flex-colo border border-subMain rounded-full font-medium w-20 h-20 text-xl"
                >
                  <FaPlay />
                </button>
              </div>
              <Image
                src={
                  movie?.movie_image
                    ? movie.movie_image
                    : "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?cs=srgb&dl=pexels-vlad-che%C8%9Ban-1595655.jpg&fm=jpg"
                }
                height={100}
                width={100}
                alt={movie?.movie_title ? movie.movie_title : "Movie Name"}
                className="w-full h-full object-cover rounded-lg"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchPage;
