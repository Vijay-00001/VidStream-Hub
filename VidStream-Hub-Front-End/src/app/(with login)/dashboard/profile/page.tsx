"use client";
import React, { useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Uploder } from "@/components/Uploder";
import { Inputs } from "@/components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "@/components/notifications/Error";
import { TypeOfDispatch, TypeOfState, User } from "@/Types";
import { ProfileValidation } from "@/components/validation/UserValidation";
import { ImagePreview } from "@/components/ImagePreview";
import {
  DeleteAction,
  GetFavoritesMoviesAction,
  UpdateAction,
} from "@/redux/actions/UserActions";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Profile from "@/screens/dashboard/Profile";

const UserProfile = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  const [imageUrl, setImageUrl] = React.useState<string>(
    userInfo?.image ? userInfo?.image : "/profile.png"
  );

  // Update User Profile
  const { isError, isSuccess, isLoading } = useSelector(
    (state: TypeOfState) => state.userProfileUpdate
  );

  // Delete User Account
  const { isError: deleteError, isLoading: deleteLoading } = useSelector(
    (state: TypeOfState) => state.userDeleteProfile
  );
  // const Delete Profile
  const DeleteProfile = useCallback(() => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteAction());
        router.push("/auth/register");
      }
    });
  }, [dispatch, router, MySwal]);

  // react-form-hook for handle the form data
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // On Submit Event fire then call update action
  const onsubmit = useCallback(
    (data: User) => {
      dispatch(UpdateAction({ ...data, image: imageUrl }));
    },
    [imageUrl, dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    return () => {
      if (isSuccess) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        redirect("/dashboard/profile");
      }
      if (isError || deleteError) {
        toast.error(isError || deleteError);
        isError
          ? dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
          : dispatch({ type: "USER_DELETE_RESET" });
      }
      if (userInfo && userInfo.token) {
        dispatch(GetFavoritesMoviesAction());
      }
    };
  }, [userInfo, setValue, isError, deleteError, isSuccess, dispatch]);

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} token={userInfo?.token} />
          </div>
          {/* Image Preview */}
          <div className="col-span-2">
            <ImagePreview
              src={imageUrl}
              alt={userInfo?.fullName ? userInfo?.fullName : "VidStream Hub"}
            />
          </div>
        </div>
        <div className="w-full">
          <Inputs
            label="Full Name"
            placeholder="VidStream Hub"
            type="text"
            bg={true}
            name="fullName"
            register={register("fullName")}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Inputs
            label="Email"
            placeholder="vidStream.hub@space.in"
            type="text"
            bg={true}
            name="email"
            register={register("email")}
            disabled={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={DeleteProfile}
            disabled={deleteLoading}
            type="button"
            className="bg-subMain font-medium tansitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium tansitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default UserProfile;
