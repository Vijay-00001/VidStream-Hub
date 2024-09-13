import { SxProps } from "@mui/system";

export interface Metadata {
  title: string;
  description: string;
}

export interface User {
  fullName?: string;
  email?: string;
  image?: string;
  password?: string;
  isAdmin?: boolean;
  _id?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TypeOfUserAction {
  type: string;
  payload?: User[] | any;
}

export type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface RowsType {
  key?: number;
  data: any;
  users: any;
  onEditFunction?: any;
  onDeleteFunction?: any;
}

// Define the type for contact data
export interface ContactItem {
  id: number;
  title: string;
  info: string;
  icon: React.ComponentType; // This represents a React component
  contact: string;
}

export interface MovieInfo {
  _id: string;
  movie_title: string;
  movie_description: string;
  movie_thumbnail_image: string;
  movie_image: string;
  movie_video_url: string;
  movie_casts: string[];
  movie_catagory: string;
  movie_rating: number;
  movie_language: string;
  movie_time_duration: string;
  movie_release_date: string;
  movie_year: number;
  movie_reviews: string[];
  movie_number_of_reviews: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AllState {
  userLogin: object;
  userRegister: object;
  userProfileUpdate: object;
  userChangePassword: object;
  useSendEmail: object;
  userForgotPassword: object;
  userGetAllFavorites: object;
  userSubsription: object;
  userDeleteFavorite: object;
  userDeleteAllFavorites: object;
  userDeleteProfile: object;
  adminGetAllUser: object;
  adminDeleteUser: object;

  // Category Reducer
  getAllCategory: object;
  addCategory: object;
  updateCategory: object;
  deleteCategory: object;

  // Movie Reducer
  getAllMovies: object;
  getRandomVideos: object;
  getSingleVideo: object;
  getTopVideos: object;
  postReviewVideo: object;
  postFavoriteMovies: object;
  deleteSingleMovie: object;
  deleteAllMovies: object;
  createMovie: object;
  updateMovie: object;
  createEditDeleteCast: object;

  //Videos Reducer
  getAllVideos: object;
  getVideoById: object;
  addVideo: object;
  updateVideo: object;
  deleteVideoById: object;
}

export interface RendomMoviesType {
  isLoading: boolean;
  isError: string;
  rendomeMovies: MovieInfo[];
}

export interface TypeOfCast {
  id: number;
  name: string;
  image: string;
}

export interface TypeOfCastsModal {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  cast: TypeOfCast | undefined | any;
}

export interface TypeOfImagePreview {
  src: string;
  alt: string | undefined | any;
}
export type TypeOfState = any;
export type TypeOfDispatch = any;
export type TypeOfErrors = any;
export interface TypeOfCategory {
  modalOpen: boolean;
  setModalOpen: (openModal: boolean) => void;
  category: { _id: string; title: string } | undefined | any;
}

export interface TypeOfMainModal {
  modalOpen: boolean;
  setModalOpen: (openModal: boolean) => void;
  children: React.ReactNode;
}

export interface TypeOfShareModal {
  modalOpen: boolean;
  setModalOpen: (openModal: boolean) => void;
  movie_id: string | undefined;
  movie_title: string | undefined;
}
export interface TypeOfContent {
  _id?: string;
  title: string;
  description?: string;
  url: string;
  isPublic?: boolean | undefined;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TypeOfMusic {
  _id?: string;
  music_title: string;
  music_description?: string;
  music_url: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TypeOfPhoto {
  _id?: string;
  photo_title: string;
  photo_description?: string;
  photo_url: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TypeOfDocument {
  _id?: string;
  docs_title: string;
  docs_description?: string;
  docs_url: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TypeOfVideoAction {
  type: string;
  payload?: TypeOfContent[];
}

export interface TypeOfPrivateVideoInfo {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  video: TypeOfContent | undefined | any;
  currentInfo?: string;
}

export interface TypeOfCreateMovieInfo {
  _id?: string | undefined | object | any;
  movie_title: string;
  movie_description: string;
  movie_time_duration: string;
  movie_language: string;
  movie_year: number;
  movie_catagory: string;
  movie_casts?: TypeOfCast[];
  movie_image?: string;
  movie_video_url?: string;
  movie_thumbnail_image?: string;
  movie_rating?: number;
  movie_reviews?: any;
  movie_number_of_reviews?: any;
  _v?: number;
}

export interface TypeOfMovieAction {
  type: string;
  payload?: TypeOfCreateMovieInfo[] | any;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export interface TypeOfTopSwippere {
  nextEl: any;
  prevEl: any;
  movies: TypeOfCreateMovieInfo[];
}

export interface TypeOfMovieInfoComponent {
  movie: TypeOfCreateMovieInfo | undefined;
  setModalOpen: (modalOpen: boolean) => void;
  downloadVideo: any;
  progress: number | any;
}

export interface TypeOfStar {
  value: number | any;
}

export interface TypeOfReview {
  comment: string;
  movie_rating: number;
}

export interface TypeOfContent {
  title: string;
  description?: string | undefined;
  isPublic?: boolean | undefined;
}

export interface TypeOfDocs {
  docs_title: string;
  docs_description: string;
  docs_url: string;
}

export interface TypeOfPhoto {
  photo_title: string;
  photo_description?: string;
  photo_url: string;
}

export interface TypeOfMusic {
  music_title: string;
  music_description?: string;
  music_url: string;
}

export interface TypeOfAddContent {
  title: string;
  description?: string | undefined | null;
  type?: string | undefined | null;
  url: string;
  currentPage: string;
  isPublic?: boolean;
}

interface YAxisConfig {
  label: string;
}
export type ChartSettings = any;

interface SeriesConfig {
  dataKey: string;
  label: string;
  valueFormatter: (value: number) => string;
}

export interface ChartSetting {
  yAxis: YAxisConfig[];
  series: SeriesConfig[];
  height: number;
  sx: SxProps;
}

export type TypeOfInput = any;
