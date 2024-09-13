"use client";
import { ImagePreview } from "@/components/ImagePreview";
import { Uploder, VideoUploader } from "@/components/Uploder";
import { Inputs, Select, UserInput } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { AddVideoValidation } from "@/components/validation/UserValidation";
import {
  getVideoByIdAction,
  updateVideoAction,
} from "@/redux/actions/VideosActions";
import Sidebar from "@/components/Sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const EditVideo = () => {
  const [video_url, setVideo_url] = useState<string>("");
  const dispatch = useDispatch<any>();
  const videoId = useParams().videoId.toString();

  const { userInfo } = useSelector(
    (state: any) => state.userLogin || state.userRegister
  );

  const { isLoading, isError, video } = useSelector(
    (state: any) => state.getVideoById
  );

  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state: any) => state.updateVideo);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddVideoValidation),
  });

  const onSubmit = (data: any) => {
    dispatch(updateVideoAction(videoId, { ...data, video_url }));
  };

  // UseEffect
  useEffect(() => {
    if (video?._id !== videoId) {
      dispatch(getVideoByIdAction(videoId));
    } else {
      setValue("video_title", video?.video_title);
      setValue("video_description", video?.video_description);
      setValue("isPublic", video?.isPublic);
      setVideo_url(video?.video_url);
    }
    // If successfully created then reset the form fields value
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_VIDEO_RESET" });
      redirect(`/dashboard/my-space`);
    }
    if (editError) {
      toast.error(isError);
      dispatch({ type: "USER_UPDATE_VIDEO_RESET" });
    }
  }, [isError, isSuccess, dispatch, editError, video, videoId, setValue]);
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Update {video?.video_title} Video</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Inputs
              label="Video Title"
              placeholder="Here Enter Your Video Title"
              type="text"
              bg={true}
              register={register("video_title")}
              name="video_title"
            />
            {errors.video_title && (
              <InlineError text={errors.video_title.message} />
            )}
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

        {/* Movie Video */}
        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Upload Video
          </label>
          <div className={`w-full grid ${video_url && "grid-cols-2"} gap-6`}>
            {video_url && (
              <div className="w-full py-4 bg-main border border-subMain text-subMain border-dashed rounded flex-colo">
                Video Uploaded !!!
              </div>
            )}
            {userInfo && (
              <VideoUploader
                setVideoUrl={setVideo_url}
                token={userInfo.token}
                currentPage="video"
              />
            )}
          </div>
        </div>
        {/* Description */}
        <div className="w-full">
          <UserInput
            label="Description"
            placeholder="Make it short and sweet"
            register={register("video_description")}
            name="video_description"
          />
          {errors.video_description && (
            <InlineError text={errors.video_description.message} />
          )}
        </div>
        {/* Submit */}
        <button
          disabled={isLoading || !video_url}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain flex-rows gap-6 transitions font-medium tansitions hover:bg-dry border border-subMain text-white py-3 rounded w-full "
        >
          {isLoading || editLoading ? (
            "Updating..."
          ) : (
            <>
              <ImUpload /> Update Video
            </>
          )}
        </button>
      </div>
    </Sidebar>
  );
};

export default EditVideo;
