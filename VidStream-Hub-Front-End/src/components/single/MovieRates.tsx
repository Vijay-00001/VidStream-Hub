"use client";
import { useCallback, useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Select, UserInput } from "../UserInput";
import Stars from "../Stars";
import { Empty } from "../notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../notifications/Error";
import Link from "next/link";
import { postVideoReviewAction } from "@/redux/actions/MovieActions";
import {
  TypeOfCreateMovieInfo,
  TypeOfDispatch,
  TypeOfReview,
  TypeOfState,
} from "@/Types";
import Image from "next/image";

const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Bad",
    value: 1,
  },
  {
    title: "2 - Fair",
    value: 2,
  },
  {
    title: "3 - Good",
    value: 3,
  },
  {
    title: "4 - Very Good",
    value: 4,
  },
  {
    title: "5 - Excellent",
    value: 5,
  },
];

const MovieRates = ({ movie }: { movie: TypeOfCreateMovieInfo }) => {
  const dispatch = useDispatch<TypeOfDispatch>();

  const { isLoading, isError } = useSelector(
    (state: TypeOfState) => state.postReviewVideo
  );

  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  // Validation Reviews
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  const onSubmit = useCallback(
    (data: TypeOfReview) => {
      dispatch(postVideoReviewAction(movie?._id, data));
    },
    [dispatch, movie?._id]
  );

  // When This Component Renders and any dipendency changes then this function will be called
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "SEND_REVIEW_RESET" });
    }
  }, [dispatch, isError]);

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* Write Reviews */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold ">
            Review &ldquo;
            {movie?.movie_title ? movie.movie_title : "Movie Name"}&ldquo;
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            {movie?.movie_description ? movie.movie_description : "Movie Name"}
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Ratings"
              options={Ratings}
              name="movie_rating"
              register={register("movie_rating")}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Stars value={watch(["movie_rating"], { movie_rating: 0 })} />
            </div>
            {errors.movie_rating && (
              <InlineError text={errors.movie_rating?.message} />
            )}
          </div>
          {/* Message */}
          <div className="w-full">
            <UserInput
              label="Massage"
              placeholder="Make it short and sweets..."
              name="comment"
              register={register("comment")}
            />
            {errors.comment && <InlineError text={errors.comment?.message} />}
          </div>

          {/* Submit */}
          {userInfo ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain text-white py-3 w-full flex-colo rounded"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="bg-main border border-subMain hover:bg-subMain transitions text-white py-3 w-full flex-colo rounded"
            >
              Login to Review This Movie
            </Link>
          )}
        </form>
        {/* Reviewers */}
        <div className="col-span-3 w-full flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews (
            {movie?.movie_number_of_reviews ? movie.movie_number_of_reviews : 0}
            )
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-auto">
            {movie?.movie_reviews?.length > 0 ? (
              movie?.movie_reviews?.map((review: any, index: number) => {
                return (
                  <div
                    key={index * 3}
                    className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                  >
                    <div className="col-span-2 bg-main hidden md:block">
                      <Image
                        src={review?.user_image ? review.user_image : ""}
                        alt={review?.user_name ? review.user_name : "User Name"}
                        height={500}
                        width={500}
                        className="w-full h-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="col-span-7 flex flex-col gap-2">
                      <h2>
                        {review?.user_name ? review.user_name : "User Name"}
                      </h2>
                      <p className="text-xs leading-6 font-medium text-text">
                        {review?.comment ? review.comment : "Comment"}
                      </p>
                    </div>
                    {/* Rates */}
                    <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                      <Stars
                        value={review?.movie_rating ? review.movie_rating : 0}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty message={`Be first to rate "${movie?.movie_title}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRates;
