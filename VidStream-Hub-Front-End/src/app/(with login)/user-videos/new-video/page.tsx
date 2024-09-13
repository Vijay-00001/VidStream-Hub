"use client";
import { VideoUploader } from "@/components/Uploder";
import { Inputs, Select, UserInput } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { userDataValidation } from "@/components/validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { addNewContentAction } from "@/redux/actions/VideosActions";
import { TypeOfContent, TypeOfDispatch, TypeOfState } from "@/Types";

const AddContents = () => {
  const commonCSS =
    "w-full md:w-56 py-3 bg-main rounded-md hover:text-subMain transitions";

  const dispatch = useDispatch<TypeOfDispatch>();
  const [url, setUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("Add Video");

  const conditions =
    currentPage === "Add Video"
      ? "Video"
      : currentPage === "Add Music"
      ? "Music"
      : currentPage === "Add Photo"
      ? "Photo"
      : "Documents";

  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  const { isLoading, isError, isSuccess } = useSelector(
    (state: TypeOfState) => state.addVideo
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userDataValidation),
  });

  const onSubmit = (data: TypeOfContent | any) => {
    dispatch(addNewContentAction({ ...data, url, currentPage }));
  };

  // UseEffect
  useEffect(() => {
    // If successfully created then reset the form fields value
    if (isSuccess) {
      reset({
        title: "",
        description: "",
      });
      setUrl("");
      dispatch({ type: "USER_ADD_NEW_VIDEO_RESET" });
      redirect("/user-videos/new-video");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_ADD_NEW_VIDEO_RESET" });
    }
  }, [isError, isSuccess, dispatch, reset]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="grid md:grid-cols-2 md:col-start-2 md:gap-1 lg:grid-cols-4 gap-3 border-b-main">
          <button
            onClick={() => setCurrentPage("Add Video")}
            className={commonCSS}
          >
            Add Video
          </button>
          <button
            onClick={() => setCurrentPage("Add Music")}
            className={commonCSS}
          >
            Add Music
          </button>
          <button
            onClick={() => setCurrentPage("Add Photo")}
            className={commonCSS}
          >
            Add Photo
          </button>
          <button
            onClick={() => setCurrentPage("Add Documents")}
            className={commonCSS}
          >
            Add Documents
          </button>
        </div>
        <span className="h-[3px] w-full bg-main rounded-full my-2"></span>
        <h2 className="text-xl font-bold">Add New {conditions}</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Inputs
              label="Title"
              placeholder="Here Enter Your Title"
              type="text"
              bg={true}
              register={register("title")}
              name="title"
            />
            {errors.title && <InlineError text={errors.title.message} />}
          </div>
          <div className="text-sm w-full">
            <Select
              label="Share With Everyone"
              options={[
                { value: true, title: "Yes" },
                { value: false, title: "No" },
              ]}
              register={register("isPublic")}
              name="isPublic"
            />
            {errors.isPublic && <InlineError text={errors.isPublic.message} />}
          </div>
        </div>

        {/* Video */}
        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Upload {conditions}
          </label>
          <div className={`w-full grid ${url && "grid-cols-2"} gap-6`}>
            {url && (
              <div className="w-full py-4 bg-main border border-subMain text-subMain border-dashed rounded flex-colo">
                {conditions} Uploaded !!!
              </div>
            )}
            {userInfo && (
              <VideoUploader
                setVideoUrl={setUrl}
                token={userInfo.token}
                currentPage={
                  currentPage === "Add Video"
                    ? "video"
                    : currentPage === "Add Music"
                    ? "music"
                    : currentPage === "Add Photo"
                    ? "photos"
                    : "documents"
                }
              />
            )}
          </div>
        </div>
        {/* Description */}
        <div className="w-full">
          <UserInput
            label="Description"
            placeholder="Make it short and sweet"
            register={register("description")}
            name="description"
          />
          {errors.description && (
            <InlineError text={errors.description.message} />
          )}
        </div>
        {/* Submit */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain flex-rows gap-6 transitions font-medium tansitions hover:bg-dry border border-subMain text-white py-3 rounded w-full "
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Add {conditions}
            </>
          )}
        </button>
      </div>
    </Sidebar>
  );
};

export default AddContents;
