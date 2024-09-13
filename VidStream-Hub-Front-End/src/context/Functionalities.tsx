import { addToLikedVideosAction } from "@/redux/actions/MovieActions";
import Axios from "@/redux/apis/Axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IoMdCloudDownload } from "react-icons/io";
import {
  TypeOfCreateMovieInfo,
  TypeOfDispatch,
  TypeOfState,
  TypeOfUserAction,
} from "@/Types";

// Check if add the video to favorites
export const IfMovieLiked = (movieId: string) => {
  const { likedMovies } = useSelector(
    (state: TypeOfState) => state.userGetAllFavorites
  );

  if (movieId === "undefined") return false;

  return likedMovies?.find((m: TypeOfCreateMovieInfo) => m._id === movieId);
};

// Liked Movie Functionality
export const LikeMovie = async (
  movie_id: string,
  dispatch: TypeOfDispatch,
  userInfo: TypeOfUserAction
) => {
  return !userInfo
    ? toast.error("Please login first to add the movie to favorites")
    : await dispatch(addToLikedVideosAction(movie_id));
};

// Download Video url Functionality
export const DownloadVideo = async (
  videoUrl: string,
  setProgress: TypeOfState
) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      const { loaded, total }: any = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgress(percent);
      if (percent > 0 && percent < 100) {
        toast.loading(`Downloading ${percent}%`, {
          id: "download",
          duration: 10000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: "1px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-submain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};
