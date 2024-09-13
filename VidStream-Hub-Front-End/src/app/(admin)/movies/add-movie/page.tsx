"use client";
import CastsModal from "@/components/modals/CastsModal";
import Sidebar from "@/components/Sidebar";
import { ImagePreview } from "@/components/ImagePreview";
import { Uploder, VideoUploader } from "@/components/Uploder";
import { Inputs, Select, UserInput } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { CreateMovieValidation } from "@/components/validation/MovieValidation";
import {
  createMovieAction,
  removeCastsAction,
} from "@/redux/actions/MovieActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TypeOfCreateMovieInfo, TypeOfDispatch, TypeOfState } from "@/Types";
import Image from "next/image";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cast, setCast] = useState<string>("");

  const [movie_thumbnail_image, setMovie_thumbnail_image] =
    useState<string>("");
  const [movie_image, setMovie_image] = useState<string>("");
  const [movie_video_url, setMovie_video_url] = useState<string>("");
  const dispatch = useDispatch<TypeOfDispatch>();

  const { userInfo } = useSelector(
    (state: any) => state.userLogin || state.userRegister
  );

  // Get All Categories from the Redux store
  const { categories } = useSelector(
    (state: TypeOfState) => state.getAllCategory
  );

  // Create Movie from the Redux store
  const { isLoading, isError, isSuccess } = useSelector(
    (state: TypeOfState) => state.createMovie
  );

  // Get All Casts from the Redux store
  const { casts } = useSelector(
    (state: TypeOfState) => state.createEditDeleteCast
  );

  // Use the react hook form to handle the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateMovieValidation),
  });

  // When Admin add the movies the call this function
  const onSubmit = useCallback(
    (data: TypeOfCreateMovieInfo) => {
      dispatch(
        createMovieAction({
          ...data,
          movie_thumbnail_image,
          movie_image,
          movie_video_url,
          movie_casts: casts.length > 0 ? casts : [],
        })
      );
    },
    [dispatch, movie_thumbnail_image, movie_image, movie_video_url, casts]
  );

  // Delete Casts
  const deleteCastHandler = useCallback(
    (id: number) => {
      alert(`casts id is : ", ${id}`);
      dispatch(removeCastsAction(id));
      toast.success("Casts Deleted");
    },
    [dispatch]
  );

  // If Any state and variable change then call UseEffect
  useEffect(() => {
    // If successfully created then reset the form fields value
    if (isSuccess) {
      reset({
        movie_title: "",
        movie_time_duration: "",
        movie_language: "",
        movie_year: 0,
        movie_catagory: "",
        movie_description: "",
      });
      setMovie_thumbnail_image("");
      setMovie_image("");
      setMovie_video_url("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      redirect("/movies/add-movie");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [isError, isSuccess, dispatch, reset, modalOpen]);

  return (
    <Sidebar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      {/* <AddMovie setModalOpen={setModalOpen} setCast={setCast} /> */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Movie</h2>
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
            <Uploder setImageUrl={setMovie_image} token={userInfo?.token} />
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
            className={`w-full grid ${movie_video_url && "grid-cols-2"} gap-6`}
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
          <button
            onClick={() => {
              setCast("");
              setModalOpen(true);
            }}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4 h-48 overflow-y-auto">
            {casts?.length > 0 &&
              casts.map((cast: any) => (
                <div
                  key={cast?.id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <Image
                    src={
                      cast?.image
                        ? cast.image
                        : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    }
                    alt={cast?.name}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded mb-4"
                  />
                  <p>{cast?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteCastHandler(cast?.id)}
                      className="w-6 h-6 flex-colo bg-dry border border-subMain border-dashed text-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(cast);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-subMain border-dashed text-green-600 rounded"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Submit */}
        <button
          disabled={
            isLoading || !movie_image || !movie_thumbnail_image
            // ||
            // !movie_video_url
          }
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain flex-rows gap-6 transitions font-medium tansitions hover:bg-dry border border-subMain text-white py-3 rounded w-full "
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </Sidebar>
  );
};

export default AddMovie;
