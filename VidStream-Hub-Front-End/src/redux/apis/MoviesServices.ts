import { TypeOfCreateMovieInfo } from "@/Types";
import Axios from "./Axios";

// ****************** PUBLIC API CALLS ******************

//Get All Movies API call
export const GetAllMovies = async () => {
  const { data } = await Axios.get("/movies");
  return data;
};

// Get Selected All Movies API call
export const GetSelectedAllMovies = async (
  category: string,
  time: string,
  language: string,
  rate: string,
  year: string,
  search: string,
  pageNumber: string
) => {
  const { data } = await Axios.get(
    `/movies/selected/movies?movie_catagory=${category}&movie_time_duration=${time}&movie_language=${language}&movie_rating=${rate}&movie_year=${year}&serch=${search}&page=${
      pageNumber ? pageNumber : 1
    }`
  );
  return data;
};

// Get Random Movies API Call
export const GetRandomMovies = async () => {
  const { data } = await Axios.get("/movies/random");
  return data;
};

// Get Movie By id API Call
export const GetIdByMovies = async (id: string) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

// Get top rated videos API Call
export const GetTopRatedVideos = async () => {
  const { data } = await Axios.get("/movies/sorted/top");
  return data;
};

// Get Movies By Year API Call
export const GetMoviesByYear = async (token: string) => {
  const { data } = await Axios.get("/admin/movies/count-by-movie-year", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Send Review API Call
export const SendReviewOfVideos = async (
  token: string,
  id: string,
  review: any
) => {
  const { data } = await Axios.post(`/private/movies/${id}/review`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Add To Favorites API Call
export const AddToFavoritesVideos = async (movie_id: string, token: string) => {
  const movieId = { movie_id };
  const { data } = await Axios.post(`/user/likedMovies`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete Movie API Call
export const DeleteMovie = async (id: string, token: string) => {
  const { data } = await Axios.delete(`/admin/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all Movies API Call
export const DeleteAllMovies = async (token: string) => {
  const { data } = await Axios.delete("/admin/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// *************************** ADMIN API CALLS ***************************

// create Movie API Call
export const CreateMovie = async (
  movie: TypeOfCreateMovieInfo,
  token: string
) => {
  const { data } = await Axios.post("/admin/movies/add", movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update Movie API call
export const UpdateMovie = async (
  id: string,
  movie: TypeOfCreateMovieInfo,
  token: string
) => {
  const { data } = await Axios.put(`/admin/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
