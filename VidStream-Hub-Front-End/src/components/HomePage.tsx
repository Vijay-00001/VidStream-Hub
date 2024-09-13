"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Banner from "@/components/home/Banner";
import PopularMovies from "@/components/home/PopularMovies";
import Promos from "@/components/home/Promos";
import Publised from "@/components/home/Publised";
import TopRated from "@/components/home/TopRated";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedVideosAction,
} from "@/redux/actions/MovieActions";
import {
  getAllMusicAction,
  getAllPhotoAction,
  getAllVideoAction,
} from "@/redux/actions/VideosActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdPhotos } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<TypeOfDispatch>();

  // Get Random Videos
  const {
    isLoading: randomLoading,
    isError: randomeError,
    rendomeMovies,
  } = useSelector((state: TypeOfState) => state.getRandomVideos);

  // Get Top rated Videos
  const {
    isLoading: topLoading,
    isError: topError,
    topmovies,
  } = useSelector((state: TypeOfState) => state.getTopVideos);

  // Get All Movie from the Redux store
  const { isLoading, isError, movies } = useSelector(
    (state: TypeOfState) => state.getAllMovies
  );

  const {
    isLoading: videosLoading,
    isError: videosError,
    videos,
  } = useSelector((state: TypeOfState) => state.getAllVideos);

  const {
    isLoading: musicLoading,
    isError: musicError,
    musics,
  } = useSelector((state: TypeOfState) => state.getAllMusics);

  const {
    isLoading: photoLoading,
    isError: photoError,
    photos,
  } = useSelector((state: TypeOfState) => state.getAllPhotos);

  useEffect(() => {
    // Get Random Movies
    dispatch(getRandomMoviesAction());
    // Get Top Rated Movies
    dispatch(getTopRatedVideosAction());
    // Get All Movies
    dispatch(getAllMoviesAction({}));
    // Get All Videos
    dispatch(getAllVideoAction());
    // Get All Music
    dispatch(getAllMusicAction());
    // Get All Photos
    dispatch(getAllPhotoAction());

    // if any errors is occured then
    if (
      randomeError ||
      topError ||
      isError ||
      videosError ||
      musicError ||
      photoError
    ) {
      toast.error(isError);
    }
  }, [
    dispatch,
    isError,
    randomeError,
    topError,
    videosError,
    musicError,
    photoError,
  ]);

  return (
    <>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={rendomeMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topmovies} isLoading={topLoading} />
        <Publised
          contents={videos}
          isLoading={videosLoading}
          title="Published Videos"
          icon={SiYoutubeshorts}
        />
        <Publised
          contents={musics}
          isLoading={musicLoading}
          title="Published Musics"
          icon={MdLibraryMusic}
        />
        <Publised
          contents={photos}
          isLoading={photoLoading}
          title="Published Photos"
          icon={IoMdPhotos}
        />
      </div>
    </>
  );
};

export default HomePage;
