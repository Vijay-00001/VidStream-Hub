"use client";
import Movie from "@/components/Movie";
import Titles from "@/components/Titles";
import ShareModal from "@/components/modals/ShareModal";
import MovieCasts from "@/components/single/MovieCasts";
import MovieInfo from "@/components/single/MovieInfo";
import MovieRates from "@/components/single/MovieRates";
import { getSingleVideosAction } from "@/redux/actions/MovieActions";
import { BsCollectionFill } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { DownloadVideo } from "@/context/Functionalities";
import FileSaver from "file-saver";
import { SidebarContext } from "@/context/DrawerContext";
import { TypeOfCreateMovieInfo, TypeOfState } from "@/Types";

const SingleMovieInfo = () => {
  const dispatch = useDispatch<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const parameterId = useParams().movieId.toString();
  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  const sameClass = "w-full flex-colo h-48 xl:h-96 lg:h-64 bg-dry";

  const { isLoading, isError, movie } = useSelector(
    (state: TypeOfState) => state.getSingleVideo
  );

  // useSelector to get all movies
  const { movies } = useSelector((state: TypeOfState) => state.getAllMovies);

  const relatedMovies = movies?.filter(
    (video: TypeOfState) => video?.movie_catagory == movie?.movie_catagory
  );

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
    <>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo mb-4 w-24 p-5 aspect-square bg-dry text-subMain text-4xl rounded-full">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            Somthing went wrong Your Finded Video is not found
          </p>
        </div>
      ) : (
        <>
          <ShareModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie_id={movie?.movie_id}
            movie_title={movie?.movie_title}
          />
          {/* <SingleMovie setModalOpen={setModalOpen} movies={movies} /> */}
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            downloadVideo={downloadVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* Movies Rates */}
            <MovieRates movie={movie} />
            {/* Related Movies */}
            {relatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {relatedMovies?.map((movie: TypeOfCreateMovieInfo) => {
                    return <Movie key={movie?._id} movie={movie} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SingleMovieInfo;
