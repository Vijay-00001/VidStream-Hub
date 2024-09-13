"use client";
import Sidebar from "@/components/Sidebar";
import { ImagePreview } from "@/components/ImagePreview";
import { Uploder, VideoUploader } from "@/components/Uploder";
import { Inputs, Select, UserInput } from "@/components/UserInput";
import CastsModal from "@/components/modals/CastsModal";
import { InlineError } from "@/components/notifications/Error";
import Loader from "@/components/notifications/Loader";
import { CreateMovieValidation } from "@/components/validation/MovieValidation";
import {
  getSingleVideosAction,
  removeCastsAction,
  updateMovieAciton,
} from "@/redux/actions/MovieActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  TypeOfCast,
  TypeOfCreateMovieInfo,
  TypeOfDispatch,
  TypeOfState,
} from "@/Types";
import Image from "next/image";

const EditMovie = () => {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<TypeOfDispatch>();
  const router = useRouter();
  const movieId = useParams().movieId.toString();

  // Get User Info from the Redux store
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  // Get All Categories from the Redux store
  const { categories } = useSelector(
    (state: TypeOfState) => state.getAllCategory
  );

  // Get Single Video from the Redux store
  const { isLoading, isError, movie } = useSelector(
    (state: TypeOfState) => state.getSingleVideo
  );

  // Update Movie from the Redux store
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state: TypeOfState) => state.updateMovie);
  const { casts } = useSelector(
    (state: TypeOfState) => state.createEditDeleteCast
  );

  // Defined the state of the form to be used in the form
  const [cast, setCast] = useState<TypeOfCast[] | TypeOfState>(movie?.casts);
  const [movie_thumbnail_image, setMovie_thumbnail_image] =
    useState<string>("");
  const [movie_image, setMovie_image] = useState<string>("");
  const [movie_video_url, setMovie_video_url] = useState<string>("");

  console.log("video url is : ===> ", movie_video_url);

  // react hook form for validation and handle the form data.
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateMovieValidation),
  });

  // Update Movie to call the onSubmit function
  const onSubmit = useCallback(
    (data: TypeOfCreateMovieInfo) => {
      dispatch(
        updateMovieAciton(movieId, {
          ...data,
          movie_thumbnail_image,
          movie_image,
          movie_video_url,
          movie_casts: [...movie?.movie_casts, ...casts],
        })
      );
    },
    [
      dispatch,
      movie,
      movieId,
      movie?.casts,
      movie_image,
      movie_thumbnail_image,
      movie_video_url,
      casts,
    ]
  );

  // Delete Casts
  const deleteCastHandler = useCallback(
    (id: number) => {
      dispatch(removeCastsAction(id));
      toast.success("Casts Deleted");
    },
    [dispatch]
  );

  // UseEffect when any state changes then render the page
  useEffect(() => {
    if (movie?._id !== movieId) {
      dispatch(getSingleVideosAction(movieId));
    } else {
      setValue("movie_title", movie?.movie_title);
      setValue("movie_time_duration", movie?.movie_time_duration);
      setValue("movie_language", movie?.movie_language);
      setValue("movie_year", movie?.movie_year);
      setValue("movie_catagory", movie?.movie_catagory);
      setValue("movie_description", movie?.movie_description);
      setMovie_thumbnail_image(
        movie_thumbnail_image
          ? movie_thumbnail_image
          : movie?.movie_thumbnail_image
      );
      setMovie_image(movie_image ? movie_image : movie?.movie_image);
      setMovie_video_url(
        movie_video_url ? movie_video_url : movie?.movie_video_url
      );
    }
    // If successfully created then reset the form fields value
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      router.push(`/movies/edit-movie/${movieId}`);
    }
    if (editError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [
    dispatch,
    movie,
    movieId,
    modalOpen,
    setValue,
    movie_thumbnail_image,
    movie_image,
    movie_video_url,
    isSuccess,
    isError,
    editError,
    router,
  ]);

  return (
    <>
      <Sidebar>
        {isLoading || editLoading ? (
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
            <CastsModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              cast={cast}
            />
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">Update {movie?.movie_title}</h2>
              <div className="w-full grid md:grid-cols-2 gap-6">
                <div className="w-full">
                  <Inputs
                    label="Movie Title"
                    placeholder="Game OF Thrones"
                    type="text"
                    bg={true}
                    register={register("movie_title")}
                    name="movie_title"
                  />
                  {errors.movie_title && (
                    <InlineError text={errors.movie_title.message} />
                  )}
                </div>
                <div className="w-full">
                  <Inputs
                    label="Hours"
                    placeholder="2hr 47min"
                    type="text"
                    bg={true}
                    register={register("movie_time_duration")}
                    name="movie_time_duration"
                  />
                  {errors.movie_time_duration && (
                    <InlineError text={errors.movie_time_duration.message} />
                  )}
                </div>
              </div>
              <div className="w-full grid md:grid-cols-2 gap-6">
                <div className="w-full">
                  <Inputs
                    label="Language Used"
                    placeholder="English"
                    type="text"
                    bg={true}
                    register={register("movie_language")}
                    name="movie_language"
                  />
                  {errors.movie_language && (
                    <InlineError text={errors.movie_language.message} />
                  )}
                </div>
                <div className="w-full">
                  <Inputs
                    label="Year Of Release"
                    placeholder="2024"
                    type="number"
                    bg={true}
                    register={register("movie_year")}
                    name="movie_year"
                  />
                  {errors.movie_year && (
                    <InlineError text={errors.movie_year.message} />
                  )}
                </div>
              </div>
              {/* Images Upload fields */}
              <div className="w-full grid md:grid-cols-2 gap-6">
                {/* Image without title */}
                <div className="flex flex-col gap-2">
                  <p className="text-border font-semibold text-sm">
                    Image without title
                  </p>
                  <Uploder
                    setImageUrl={setMovie_thumbnail_image}
                    token={userInfo?.token}
                  />
                  <ImagePreview src={movie_thumbnail_image} alt={"Image"} />
                </div>
                {/* Image with title */}
                <div className="flex flex-col gap-2">
                  <p className="text-border font-semibold text-sm">
                    Image with title
                  </p>
                  <Uploder
                    setImageUrl={setMovie_image}
                    token={userInfo.token}
                  />
                  <ImagePreview src={movie_image} alt={"Image"} />
                </div>
              </div>
              {/* Description */}
              <div className="w-full">
                <UserInput
                  label="Description"
                  placeholder="Make it short and sweet"
                  register={register("movie_description")}
                  name="movie_description"
                />
                {errors.movie_description && (
                  <InlineError text={errors.movie_description.message} />
                )}
              </div>
              {/* Category */}
              <div className="text-sm w-full">
                <Select
                  label="Movie Category"
                  options={categories?.length > 0 ? categories : []}
                  register={register("movie_catagory")}
                  name="movie_catagory"
                />
                {errors.movie_catagory && (
                  <InlineError text={errors.movie_catagory.message} />
                )}
              </div>
              {/* Movie Video */}
              <div className="flex flex-col gap-2 w-full ">
                <label className="text-border font-semibold text-sm">
                  Movie Video
                </label>
                <div
                  className={`w-full grid ${
                    movie_video_url && "grid-cols-2"
                  } gap-6`}
                >
                  {movie_video_url && (
                    <div className="w-full py-4 bg-main border border-subMain text-subMain border-dashed rounded flex-colo">
                      Video Uploaded !!!
                    </div>
                  )}
                  <VideoUploader
                    setVideoUrl={setMovie_video_url}
                    token={userInfo?.token}
                    currentPage="video"
                  />
                </div>
              </div>
              {/* Castes */}
              <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
                <div className="w-full">
                  <button
                    onClick={() => {
                      setCast("");
                      setModalOpen(true);
                    }}
                    className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
                  >
                    Add New Cast
                  </button>
                  <span className="text-border text-xs">
                    if you add casts the previous casts will now be deleted. So
                    you shoud add them again.
                  </span>
                </div>
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4 h-48 overflow-y-auto">
                  {casts?.length > 0 &&
                    [...movie?.movie_casts, ...casts].map(
                      (user: TypeOfCast) => (
                        <div
                          key={user?.id}
                          className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                        >
                          <Image
                            src={
                              user?.image
                                ? user.image
                                : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                            }
                            alt={user?.name}
                            width={100}
                            height={100}
                            className="w-full h-24 object-cover rounded mb-4"
                          />
                          <p>{user?.name}</p>
                          <div className="flex-rows mt-2 w-full gap-2">
                            <button
                              onClick={() => deleteCastHandler(user?.id)}
                              className="w-6 h-6 flex-colo bg-dry border border-subMain border-dashed text-subMain rounded"
                            >
                              <MdDelete />
                            </button>
                            <button
                              onClick={() => {
                                setCast(user);
                                setModalOpen(true);
                              }}
                              className="w-6 h-6 flex-colo bg-dry border border-subMain border-dashed text-green-600 rounded"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
              {/* Submit */}
              <button
                disabled={
                  isLoading || !movie_image || !movie_thumbnail_image
                  // || !movie_video_url
                }
                onClick={handleSubmit(onSubmit)}
                className="bg-subMain flex-rows gap-6 transitions font-medium tansitions hover:bg-dry border border-subMain text-white py-3 rounded w-full "
              >
                {editLoading ? (
                  "Updating..."
                ) : (
                  <>
                    <ImUpload /> Update Movie
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default EditMovie;
