export interface TypeVideos {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  isPublic: boolean;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

export interface TypeUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  videos: string[]; // Array of videos, you can replace 'any' with the specific type of video data if available
  likedMovies: string[] | TypeVideos; // Array of movie IDs
  isAdmin: boolean;
  image: string;
  musics?: string[];
  photos?: string[];
  documents?: string[];
  updatedAt: Date;
  createdAt: Date;
  token: string;
  isDelete?: boolean;
  __v: number;
  save?: () => void;
}

export interface RegisterUser {
  fullName: string;
  email: string;
  isAdmin: boolean;
  image: string;
  likedMovies?: string[];
  token: string;
}

export interface Passwords {
  oldPassword: string;
  newPassword: string;
}

export interface LocalUserValidation {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

export interface MovieId {
  movie_id: string;
}

export interface StripeEvent {
  id: string;
  object: 'event';
  type: string;
  created: number;
  data: {
    object: any; // The specific data object depends on the event type
  };
}

export interface UpdateUserInfo {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  isAdmin: boolean;
  token: string;
}

export interface TypeOfVideos {
  _id: string;
  user_id: string;
  video_title: string;
  video_description: string;
  video_image: string;
  video_url: string;
  isPublic: boolean;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

export interface TypeOfSubscription {
  _id?: string;
  session_id?: string;
  planId: string;
  planStartDate: string;
  planEndDate: string;
  planAmount?: number;
  planStatus: string;
  planType?: string;
  userId?: string;
  __v?: number;
}

export interface Cast {
  id: number;
  name: string;
  image: string;
}

export interface TypeOfMovies {
  _id?: string | object;
  movie_title: string;
  movie_description: string;
  movie_image: string;
  movie_thumbnail_image: string;
  movie_video_url: string;
  movie_rating: number;
  movie_year: number;
  movie_language: string;
  movie_reviews?: string[] | object[] | any;
  movie_number_of_reviews: number;
  movie_time_duration?: number | string;
  movie_category?: string;
  user_id?: string | object;
  movie_casts: Cast[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface TypeOfQuery {
  serch?: string;
  movie_language?: string;
  movie_catagory?: string;
  movie_year?: number;
  movie_time_duration?: string;
  movie_rating?: string;
  page?: number;
  user_limit?: number;
}

export interface TypeOfReturnQuery {
  movies: TypeOfMovies[];
  page: number;
  pages: number;
  totalMovies: number;
}

export interface TypeOfUserReviews {
  comment: string;
  movie_rating: number;
}

export interface TypeOfReviews {
  _id: string;
  user_id: string;
  comment: string;
  movie_rating: number;
  __v?: number;
}

export interface TypeOfCategory {
  _id?: string | object;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
